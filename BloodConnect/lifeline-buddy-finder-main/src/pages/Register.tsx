import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, User, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import EmergencyBanner from "@/components/EmergencyBanner";
import { useBloodDonors } from "@/hooks/useBloodDonors";

const Register = () => {
  const navigate = useNavigate();
  const { registerDonor } = useBloodDonors();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_group: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    last_donation_date: "",
    medical_conditions: "",
    is_available: true,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const donorData = {
        ...formData,
        age: parseInt(formData.age),
        email: formData.email || undefined,
        address: formData.address || undefined,
        last_donation_date: formData.last_donation_date || undefined,
        medical_conditions: formData.medical_conditions || undefined,
      };

      await registerDonor(donorData);
      navigate("/donors");
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <EmergencyBanner />
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Register as Blood Donor
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our community of life-saving heroes
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Donor Registration Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to register as a blood donor. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        required
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Must be 18-65"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="blood_group">Blood Group *</Label>
                    <Select 
                      value={formData.blood_group} 
                      onValueChange={(value) => handleInputChange("blood_group", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Medical Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="last_donation_date">Last Donation Date</Label>
                    <Input
                      id="last_donation_date"
                      type="date"
                      value={formData.last_donation_date}
                      onChange={(e) => handleInputChange("last_donation_date", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="medical_conditions">Medical Conditions</Label>
                    <Textarea
                      id="medical_conditions"
                      value={formData.medical_conditions}
                      onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                      placeholder="List any medical conditions, medications, or health concerns"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Eligibility Note */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Eligibility Requirements:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Must be between 18-65 years old</li>
                    <li>• Weight should be at least 50 kg (110 lbs)</li>
                    <li>• Should be in good health</li>
                    <li>• Must wait at least 56 days between donations</li>
                    <li>• No recent tattoos or piercings (within 12 months)</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Registering..." : "Register as Donor"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Register;