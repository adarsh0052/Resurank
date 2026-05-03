from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import json
import os

model = OllamaLLM(model="llama3.2")

# Load ranking data for reference
with open("priority_and_ranking.json", "r") as f:
    ranking_data = json.load(f)

template = """
You are an expert HR assistant specialized in resume analysis and candidate ranking for {job_role} positions in the {job_category} field.

Here is the scoring criteria used for this position:
{scoring_criteria}

Here are the top matching resumes based on the search: {resumes}

Answer the following query about these candidates: {question}

If asked for rankings, provide detailed explanations about why candidates were ranked in this order based on their qualifications and the job criteria.
"""
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

def print_job_categories():
    print("\nAvailable Job Categories:")
    for i, category in enumerate(ranking_data["job_categories"].keys()):
        print(f"{i+1}. {category}")
    print()

def print_job_roles(category):
    print(f"\nAvailable Roles in {category}:")
    for i, role in enumerate(ranking_data["job_categories"][category]["roles"]):
        print(f"{i+1}. {role['title']}")
    print()

def get_scoring_criteria_text(job_category, job_role):
    for category in ranking_data["job_categories"]:
        if category.lower() == job_category.lower():
            for role in ranking_data["job_categories"][category]["roles"]:
                if role["title"].lower() == job_role.lower():
                    criteria = role["resume_scoring"]
                    text = "Scoring criteria weights (out of 100):\n"
                    for criterion, weight in criteria.items():
                        text += f"- {criterion.replace('_', ' ').title()}: {weight}%\n"
                    return text
    return "No specific scoring criteria found."

def select_job():
    print_job_categories()
    categories = list(ranking_data["job_categories"].keys())

    while True:
        try:
            cat_choice = int(input("Select job category (number): ")) - 1
            if 0 <= cat_choice < len(categories):
                category = categories[cat_choice]
                break
            else:
                print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a number.")

    print_job_roles(category)
    roles = [role["title"] for role in ranking_data["job_categories"][category]["roles"]]

    while True:
        try:
            role_choice = int(input("Select job role (number): ")) - 1
            if 0 <= role_choice < len(roles):
                role = roles[role_choice]
                break
            else:
                print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a number.")

    return category, role

def main():
    print("\n=== Resume Ranking System ===")
    print("This system helps you analyze and rank resumes based on job requirements.")

    print("\nPlease select the position you're hiring for:")
    job_category, job_role = select_job()

    print(f"\nYou've selected: {job_role} in {job_category}")
    print("Processing resumes for this position...")

    from backend.vector import get_retriever, get_all_resumes

    scoring_criteria = get_scoring_criteria_text(job_category, job_role)

    while True:
        print("\n\n-------------------------------")
        print("Options:")
        print("1. Rank all candidates for this position")
        print("2. Search for specific skills or experience")
        print("3. Ask questions about candidates")
        print("4. Select a different position")
        print("q. Quit")

        choice = input("\nEnter your choice: ")

        if choice == "q":
            break

        if choice == "1":
            result = get_all_resumes(job_category, job_role)

            if result and "documents" in result:
                resumes = []
                for i, doc_text in enumerate(result["documents"]):
                    metadata = {}
                    for key in result["metadatas"][i]:
                        if key == "scores_by_criterion":
                            if isinstance(result["metadatas"][i][key], str):
                                try:
                                    metadata[key] = json.loads(result["metadatas"][i][key])
                                except:
                                    metadata[key] = {}
                            else:
                                metadata[key] = result["metadatas"][i][key]
                        else:
                            metadata[key] = result["metadatas"][i][key]

                    from langchain_core.documents import Document
                    doc = Document(page_content=doc_text, metadata=metadata)
                    resumes.append(doc)

                sorted_resumes = sorted(resumes, key=lambda x: x.metadata.get('score', 0), reverse=True)

                print(f"\nRanked candidates for {job_role} in {job_category} ({len(sorted_resumes)} total):")
                for i, resume in enumerate(sorted_resumes):
                    print(f"\n{i+1}. {resume.metadata['name']} - Score: {resume.metadata['score']:.1f}")
                    print(f"   Contact: {resume.metadata['contact']}")

                    if 'scores_by_criterion' in resume.metadata and resume.metadata['scores_by_criterion']:
                        print("   Scoring breakdown:")
                        for criterion, score in resume.metadata['scores_by_criterion'].items():
                            print(f"   - {criterion.replace('_', ' ').title()}: {score:.1f}")
            else:
                print("No resumes found for this position.")

        elif choice == "2":
            query = input("\nEnter skills or experience to search for: ")
            retriever = get_retriever(job_category, job_role, k=5)
            resumes = retriever.invoke(query)

            print(f"\nTop matching candidates for '{query}':")
            for i, resume in enumerate(resumes):
                print(f"\n{i+1}. {resume.metadata['name']} - Score: {resume.metadata['score']:.1f}")
                print(f"   Contact: {resume.metadata['contact']}")

        elif choice == "3":
            question = input("\nEnter your question about the candidates: ")
            retriever = get_retriever(job_category, job_role, k=5)
            resumes = retriever.invoke(question)

            result = chain.invoke({
                "resumes": resumes,
                "question": question,
                "job_category": job_category,
                "job_role": job_role,
                "scoring_criteria": scoring_criteria
            })

            print("\n", result)

        elif choice == "4":
            job_category, job_role = select_job()
            print(f"\nYou've selected: {job_role} in {job_category}")
            print("Processing resumes for this position...")
            scoring_criteria = get_scoring_criteria_text(job_category, job_role)

if __name__ == "__main__":
    main()