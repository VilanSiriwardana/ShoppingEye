import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ShopQR() {
  const [qrCode, setQrCode] = useState("");
  var currentUserId = localStorage.getItem("userId");
  const qrCodeRef = useRef(null); // Reference for the QR code element

  currentUserId = "66d0e43521160ad9f22e3b71"; // Example user ID for testing

  useEffect(() => {
    if (currentUserId) {
      // Automatically generate the QR code URL based on the current user ID
      const generatedUrl = `http://localhost:3000/shops/${currentUserId}`;
      setQrCode(generatedUrl); // Set the generated URL to create the QR code
    }
  }, [currentUserId]);

  const downloadPng = async () => {
    const canvas = await html2canvas(qrCodeRef.current); // Capture the QR code as a canvas
    canvas.toBlob((blob) => {
      saveAs(blob, "QRCode.png"); // Save as PNG
    });
  };

  const downloadPdf = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 180); // Adjust size as needed
    pdf.save("QRCode.pdf"); // Save as PDF
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {qrCode && (
        <div className="text-center" ref={qrCodeRef}>
          <h2 className="mb-4 text-xl font-semibold " >My QR Code:</h2>
          <div className="mx-auto" >
            <QRCodeCanvas value={qrCode} size={200} />
          </div>

          {/* Buttons to download QR code as PNG and PDF */}
          <div className="mt-4">
            <button
              onClick={downloadPng}
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Download PNG
            </button>
            <button
              onClick={downloadPdf}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
