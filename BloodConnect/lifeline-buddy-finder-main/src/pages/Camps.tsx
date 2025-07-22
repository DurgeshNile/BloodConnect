import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import EmergencyBanner from "@/components/EmergencyBanner";
import { useDonationCamps } from "@/hooks/useDonationCamps";
import { useToast } from "@/components/ui/use-toast";

const Camps = () => {
  const { camps, loading, registerForCamp } = useDonationCamps();
  const { toast } = useToast();
  const [selectedCamp, setSelectedCamp] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_age: "",
    donor_blood_group: "",
    donor_phone: "",
    donor_email: "",
    medical_info: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCamp) {
      toast({
        title: "Error",
        description: "Please select a camp to register for",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerForCamp({
        camp_id: selectedCamp,
        donor_name: formData.donor_name,
        donor_age: parseInt(formData.donor_age),
        donor_blood_group: formData.donor_blood_group,
        donor_phone: formData.donor_phone,
        donor_email: formData.donor_email || undefined,
        medical_info: formData.medical_info || undefined,
      });

      // Reset form
      setFormData({
        donor_name: "",
        donor_age: "",
        donor_blood_group: "",
        donor_phone: "",
        donor_email: "",
        medical_info: "",
      });
      setSelectedCamp("");
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading camps...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <EmergencyBanner />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Blood Donation Camps
          </h1>
          <p className="text-xl text-muted-foreground">
            Find and register for blood donation camps near you
          </p>
        </div>

        {/* Upcoming Camps */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Upcoming Camps ({camps.length})
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {camps.map((camp) => (
              <Card key={camp.id} className="blood-card">
                <CardHeader>
                  <CardTitle className="text-lg">{camp.name}</CardTitle>
                  <CardDescription>{camp.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <div className="font-medium">{formatDate(camp.date)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatTime(camp.start_time)} - {formatTime(camp.end_time)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm">{camp.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm">
                        {camp.current_registrations} / {camp.max_capacity} registered
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm">{camp.contact_phone}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Organized by: {camp.organizer}
                    </div>
                  </div>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedCamp(camp.id)}
                        disabled={camp.current_registrations >= camp.max_capacity}
                      >
                        {camp.current_registrations >= camp.max_capacity ? "Camp Full" : "Register Now"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Register for Blood Donation Camp</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to register for {camps.find(c => c.id === selectedCamp)?.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="donor_name">Full Name *</Label>
                            <Input
                              id="donor_name"
                              required
                              value={formData.donor_name}
                              onChange={(e) => handleInputChange("donor_name", e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="donor_age">Age *</Label>
                            <Input
                              id="donor_age"
                              type="number"
                              min="18"
                              max="65"
                              required
                              value={formData.donor_age}
                              onChange={(e) => handleInputChange("donor_age", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="donor_blood_group">Blood Group *</Label>
                          <Select 
                            value={formData.donor_blood_group} 
                            onValueChange={(value) => handleInputChange("donor_blood_group", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
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
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="donor_phone">Phone Number *</Label>
                            <Input
                              id="donor_phone"
                              type="tel"
                              required
                              value={formData.donor_phone}
                              onChange={(e) => handleInputChange("donor_phone", e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="donor_email">Email</Label>
                            <Input
                              id="donor_email"
                              type="email"
                              value={formData.donor_email}
                              onChange={(e) => handleInputChange("donor_email", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="medical_info">Medical Information</Label>
                          <Textarea
                            id="medical_info"
                            placeholder="Any medical conditions, medications, or relevant health information"
                            value={formData.medical_info}
                            onChange={(e) => handleInputChange("medical_info", e.target.value)}
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1">
                            Register
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pre-Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Get adequate sleep (6-8 hours)</li>
                <li>• Eat a healthy meal 3 hours before</li>
                <li>• Drink plenty of water</li>
                <li>• Avoid alcohol 24 hours before</li>
                <li>• Bring valid ID proof</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What to Bring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Valid government-issued ID</li>
                <li>• List of current medications</li>
                <li>• Emergency contact information</li>
                <li>• Previous donation records (if any)</li>
                <li>• Comfortable clothing</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post-Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Rest for 10-15 minutes</li>
                <li>• Drink fluids for next 24 hours</li>
                <li>• Avoid heavy lifting for 4 hours</li>
                <li>• Keep bandage on for 4 hours</li>
                <li>• Contact us if you feel unwell</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Camps;