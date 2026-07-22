import React, { useState } from "react";
import AadharInput from "../components/home/AadharInput";
import Navbar from "../components/common/Navbar";
import { parseAadhaar, parseAadhaarAws } from "../services/service";
import ParsedDetails from "../components/home/ParsedDetails";
import type { IParsedResponse } from "../lib/types/IParsedResponse";
import toast from "react-hot-toast";
import { validateImage } from "../lib/validateImage";

const Home: React.FC = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [data, setData] = useState<IParsedResponse | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useAdvancedPrasing, setUseAdvancedPrasing] = useState(false);

  const insertFront = (file: File | null) => {
    if (!file) return;

    if (!validateImage(file)) {
      toast.error("Please upload a valid image");
      return;
    }

    setFrontFile(file);
  };

  const insertBack = (file: File | null) => {
    if (!file) return;

    if (!validateImage(file)) {
      toast.error("Please upload a valid image");
      return;
    }

    setBackFile(file);
  };

  const handleParse = async () => {
    if (!frontFile || !backFile) return;
    setLoading(true);
    try {
      const parseFn = useAdvancedPrasing ? parseAadhaarAws : parseAadhaar;
      const data = await toast.promise(parseFn(frontFile, backFile), {
        loading: "Parsing your Aadhaar......",
        success: "Parsing completed successfully !",
        error: "Failed to parse Aadhaar. ",
      });

      setData(data.data);
    } catch (error: any) {
      console.error("Failed to parse Aadhaar:", error);
      setError(error.response?.data?.error || "Failed to parse Aadhaar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar links={[{ label: "Home", href: "/", tag: "link" }]} />

      <div className="min-h-screen bg-base p-10 md:p-16 flex font-sans text-primary">
        <div className="flex-1 max-w-[450px] pr-8 md:pr-12 flex flex-col gap-6">
          <AadharInput label="Aadhaar Front" onDrop={insertFront} />
          <AadharInput label="Aadhaar Back" onDrop={insertBack} />

          <div className="flex items-center justify-between bg-secondary/10 p-4 rounded-xl border border-secondary/20 mt-2">
            <div>
              <span className="text-sm font-semibold text-primary block">OCR Engine</span>
              <span className="textd-xs text-secondary ">
                {useAdvancedPrasing ? "Advanced Parsing" : "Standard Parsing"}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useAdvancedPrasing}
                onChange={(e) => setUseAdvancedPrasing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <button
            className="bg-primary text-base rounded-full py-4 text-[15px] font-bold cursor-pointer transition-all duration-200 mt-2 w-full shadow-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            disabled={!frontFile || !backFile || loading}
            onClick={handleParse}
          >
            {loading ? "PARSING..." : "PARSE AADHAAR"}
          </button>
        </div>

        <div className="flex-1 pl-8 md:pl-12 border-l border-secondary flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-primary">API Response</h2>
          <div className="bg-secondary/15 border border-secondary rounded-xl p-10 flex flex-col items-center justify-center min-h-[120px] overflow-auto">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : data ? (
              <ParsedDetails data={data} />
            ) : (
              <p className="text-primary text-[15px] text-center font-medium">
                "Start Performing OCR by inputing your Aadhaar front and back"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
