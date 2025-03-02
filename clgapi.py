from fastapi import FastAPI, HTTPException, APIRouter, UploadFile, File
from PIL import Image
from pydantic import BaseModel
import google.generativeai as genai
import io
import json

router = APIRouter()

GEMINI_API_KEY = "AIzaSyCY8dz3o3I5ed5bsS49Ump2HA28BnMq2EA"
genai.configure(api_key=GEMINI_API_KEY)

# Request model
class PromptRequest(BaseModel):
    prompt: str

# Root route (just to test if API is running)
@router.get("/")
def root():
    return {"message": "Gemini FastAPI Backend is up and running!"}

@router.post("/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    prompt: str = "Analyze this flower image. Tell me: 1. The flower species and class 2. Detailed biological characteristics 3. Common uses and recommendations 4. Any special care instructions"
):
    try:
        # Read and validate the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Initialize Gemini Pro Vision model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Generate response
        response = model.generate_content([prompt, image])
        
        if response.text:
            formatted_response = json.dumps(response.text, indent=4)
            return {
                "filename": file.filename,
                "analysis": formatted_response
            }
        else:
            raise HTTPException(status_code=500, detail="No response from Gemini API")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to generate content using Gemini
@router.post("/generate")
def generate_content(request: PromptRequest):
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        response = model.generate_content(request.prompt)

        if response.text:
            formatted_response = json.dumps(response.text, indent=4)
            print(formatted_response)
            return {"response": formatted_response}
        else:
            raise HTTPException(status_code=500, detail="No response from Gemini API")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
