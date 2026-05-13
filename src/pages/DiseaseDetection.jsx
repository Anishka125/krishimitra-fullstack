import { useState } from "react";
import PageLayout from "./PageLayout";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  UploadCloud,
  Leaf,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult("");
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("Please upload a leaf image first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const base64Image = await fileToBase64(image);

      const prompt = `
You are KRISHIMITRA, an AI plant disease detection assistant.

Analyze this plant/crop leaf image carefully.

Give answer in this format:

Disease Name:
Crop Type:
Confidence Level:
Visible Symptoms:
Possible Causes:
Treatment:
Prevention Tips:
Farmer Advice:

If the image is unclear or disease is not visible, clearly say that.
Reply only in English.
`;

      const response = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: image.type,
          },
        },
      ]);

      const text = response.response.text();

      setResult(text);
    } catch (error) {
      console.log(error);
      setResult("Unable to analyze image right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Disease Detection">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800">
            Plant Disease Detection
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Upload a plant leaf image and get AI-powered disease analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <label className="border-2 border-dashed border-green-400 rounded-3xl h-80 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition overflow-hidden">
              {!preview ? (
                <>
                  <UploadCloud size={80} className="text-green-600" />

                  <h2 className="text-2xl font-bold text-green-800 mt-5">
                    Upload Leaf Image
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Click to select an image
                  </p>
                </>
              ) : (
                <img
                  src={preview}
                  alt="Leaf Preview"
                  className="w-full h-full object-cover rounded-3xl"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <button
              onClick={analyzeImage}
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl text-lg font-semibold"
            >
              {loading ? "Analyzing Image..." : "Analyze Disease"}
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center">
            {!result && !loading ? (
              <div className="text-center">
                <Leaf size={90} className="mx-auto text-green-600" />

                <h2 className="text-3xl font-bold text-green-800 mt-6">
                  Disease Result
                </h2>

                <p className="text-gray-600 mt-4">
                  Upload an image and click analyze to see AI detection result.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center">
                <AlertTriangle
                  size={80}
                  className="mx-auto text-yellow-500 animate-pulse"
                />

                <h2 className="text-3xl font-bold text-green-800 mt-6">
                  Analyzing crop image...
                </h2>

                <p className="text-gray-600 mt-4">
                  KRISHIMITRA AI is checking disease symptoms.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-600" size={36} />

                  <h2 className="text-3xl font-bold text-green-800">
                    AI Disease Report
                  </h2>
                </div>

                <div className="mt-6 bg-green-50 rounded-2xl p-5">
                  <p className="text-gray-700 text-lg whitespace-pre-wrap leading-relaxed">
                    {result}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DiseaseDetection;