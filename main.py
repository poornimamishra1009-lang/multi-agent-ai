import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

# 1. Load the secret key from .env
load_dotenv()

# 2. Initialize the "Brain"
# We use Qwen-3 or Llama-3 because they are great at coding!
# Updated model name to one that is currently active
llm = ChatGroq(
    model="llama-3.3-70b-versatile", 
    temperature=0, 
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# 3. Test if it works
response = llm.invoke("Hello! Are you ready to be my coding assistant?")
print(response.content)
from langchain_core.messages import SystemMessage, HumanMessage

def planner_agent(user_request):
    # 1. The "Job Description" for the Planner
    system_prompt = SystemMessage(content=(
        # "you are an ai agent whihc searches the user needs and give it to user"
        # "it tell users this is the great jhumka you can wear for this colour"
        # "you are having perfect knowledge about women jwellery"
        # "ask user about the color of clohtes and tell the design color of jwellery"
        # "tell the style how we cna do for short height , fat and other variations ex. skin tone"
        "You are an expert Software Project Planner. "
        "Your job is to take a user request and create a high-level plan. "
        "Break the project into specific files and folders needed. "
        "Output the plan as a clear bulleted list."
    ))
    
    # 2. The actual request from the human
    user_input = HumanMessage(content=user_request)
    
    # 3. Ask the brain for the plan
    plan_response = llm.invoke([system_prompt, user_input])
    
    return plan_response.content

# --- TEST IT ---
my_request = "Build a simple web-based calculator using HTML and JavaScript"
project_plan = planner_agent(my_request)
print("--- STRATEGIC PLAN ---")
print(project_plan)

def architect_agent(plan, file_name):
    system_prompt = SystemMessage(content=(
        "You are an expert Software Architect. "
        "Look at the provided Project Plan and focus ONLY on the file: " + file_name + ". "
        "Write detailed technical requirements for this file. "
        "List the functions needed, variables to define, and any logic rules. "
        "Do not write the actual code yet, just the technical blueprint."
    ))
    
    user_input = HumanMessage(content=f"Plan: {plan}\n\nTarget File: {file_name}")
    
    architect_response = llm.invoke([system_prompt, user_input])
    
    return architect_response.content

# --- TEST IT ---
# We pick one file from our Planner's list to "Architect"
target_file = "calculator.js"
technical_blueprint = architect_agent(project_plan, target_file)

print(f"--- ARCHITECT'S BLUEPRINT FOR {target_file} ---")
print(technical_blueprint)
def coder_agent(blueprint, file_name):
    system_prompt = SystemMessage(content=(
        "You are an expert Senior Developer. "
        "Your task is to write the full code for the file: " + file_name + ". "
        "Use the provided Technical Blueprint to guide your logic. "
        "IMPORTANT: Output ONLY the source code. Do not include explanations, "
        "markdown code blocks (like ```javascript), or any intro/outro text."
    ))
    
    user_input = HumanMessage(content=f"Blueprint: {blueprint}\n\nFile: {file_name}")
    
    coder_response = llm.invoke([system_prompt, user_input])
    
    return coder_response.content

# --- TEST IT ---
# We send the blueprint we just got to the Coder
final_code = coder_agent(technical_blueprint, target_file)

print(f"--- FINAL CODE FOR {target_file} ---")
print(final_code)

def coder_agent(blueprint, file_name):
    system_prompt = SystemMessage(content=(
        "You are an expert Senior Developer. "
        "Your task is to write the full code for the file: " + file_name + ". "
        "Use the provided Technical Blueprint to guide your logic. "
        "IMPORTANT: Output ONLY the source code. Do not include explanations, "
        "markdown code blocks (like ```javascript), or any intro/outro text."
    ))
    
    user_input = HumanMessage(content=f"Blueprint: {blueprint}\n\nFile: {file_name}")
    
    coder_response = llm.invoke([system_prompt, user_input])
    
    return coder_response.content

# --- TEST IT ---
# We send the blueprint we just got to the Coder
final_code = coder_agent(technical_blueprint, target_file)

print(f"--- FINAL CODE FOR {target_file} ---")
print(final_code)
import os

def save_file(folder_name, file_name, code_content):
    # 1. Create the folder if it doesn't exist
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        print(f"Created folder: {folder_name}")
    
    # 2. Define the full path (Folder + File Name)
    file_path = os.path.join(folder_name, file_name)
    
    # 3. Write the code into the file
    with open(file_path, "w") as f:
        f.write(code_content)
    
    print(f"Successfully saved: {file_path}")

# --- TEST IT ---
# We tell Python to save the 'final_code' into a folder
# save_file("calculator-project", "calculator.js", final_code)
# --- THE MASTER AUTOMATION LOOP ---
# 1. Get the big plan
my_request = "Build a modern, dark-themed calculator using HTML, CSS, and JS"
project_plan = planner_agent(my_request)

# 2. We define the files we want to create based on the plan
# (In a more advanced version, we'd let the AI extract this list itself!)
files_to_build = ["index.html", "style.css", "script.js"]

print(f" Starting build for: {my_request}")

for file_name in files_to_build:
    print(f"  Architecting {file_name}...")
    blueprint = architect_agent(project_plan, file_name)
    
    print(f" Coding {file_name}...")
    code = coder_agent(blueprint, file_name)
    
    print(f" Saving {file_name}...")
    save_file("my_ai_app", file_name, code)

print("\n PROJECT COMPLETE! Check the 'my_ai_app' folder.")