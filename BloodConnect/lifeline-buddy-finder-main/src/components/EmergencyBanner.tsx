import { Phone } from "lucide-react";

const EmergencyBanner = () => {
  return (
    <div className="emergency-banner mb-8">
      <div className="flex items-center justify-center space-x-2">
        <Phone className="h-5 w-5" />
        <span className="font-semibold">Emergency Blood Helpline:</span>
        <a href="tel:+1-800-RED-CROSS" className="font-bold hover:underline">
          +1-800-RED-CROSS
        </a>
      </div>
    </div>
  );
};

export default EmergencyBanner;