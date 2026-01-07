from google import genai
from flask import Flask, request,jsonify,render_template
client = genai.Client(api_key="AIzaSyDkiyqYQisFUbJR2har-_tE0zQKUX40_ZI")
app=Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/chat",methods=["POST"])
def chat():
    prompt=request.json["message"]
    response=client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return jsonify({"reply": response.text})
app.run(port="8080")