import gradio as gr
import shutil
import os
import json
from vector import get_all_resumes

# Load job data
with open("Priority_and_ranking.json", "r") as f:
    ranking_data = json.load(f)

# Upload handling
def rank_resumes(file, job_category, job_role):
    # Save the uploaded file as "resume.xlsx"
    save_path = "resume.xlsx"
    with open(save_path, "wb") as f_out:
        shutil.copyfileobj(file, f_out)

    try:
        result = get_all_resumes(job_category, job_role)

        if result and "documents" in result:
            resumes = []
            for i, doc_text in enumerate(result["documents"]):
                meta = result["metadatas"][i]
                name = meta.get("name", "Unknown")
                score = meta.get("score", 0.0)
                contact = meta.get("contact", "N/A")
                breakdown = json.loads(meta.get("scores_by_criterion", "{}"))

                breakdown_str = "\n".join([f"  - {k.replace('_',' ').title()}: {v:.1f}" for k, v in breakdown.items()])
                resumes.append(
                    f"{i+1}. {name} - Score: {score:.1f}\nContact: {contact}\nScoring:\n{breakdown_str}\n"
                )
            return "\n\n".join(resumes)
        else:
            return "❌ No resumes found or scoring failed."

    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# Get job categories and roles from JSON
categories = list(ranking_data["job_categories"].keys())

def get_roles(category):
    return [
        role["title"]
        for role in ranking_data["job_categories"][category]["roles"]
    ]

# Create Gradio UI
with gr.Blocks(title="ResuRANK - Resume Ranking System") as demo:
    gr.Markdown("## 📄 ResuRANK - Upload Resumes & Rank Candidates")
    gr.Markdown("Upload your `.xlsx` file and select job category & role to rank candidates automatically.")

    with gr.Row():
        file_input = gr.File(label="Upload Excel File (.xlsx)", file_types=[".xlsx"])
    
    with gr.Row():
        category_dropdown = gr.Dropdown(label="Select Job Category", choices=categories)
        role_dropdown = gr.Dropdown(label="Select Job Role", choices=[])

    category_dropdown.change(fn=get_roles, inputs=category_dropdown, outputs=role_dropdown)

    with gr.Row():
        output_box = gr.Textbox(lines=20, label="📋 Ranked Candidates", interactive=False)

    rank_button = gr.Button("Rank Resumes ✅")

    rank_button.click(fn=rank_resumes, inputs=[file_input, category_dropdown, role_dropdown], outputs=output_box)

# Launch app
if __name__ == "__main__":
    demo.launch()
