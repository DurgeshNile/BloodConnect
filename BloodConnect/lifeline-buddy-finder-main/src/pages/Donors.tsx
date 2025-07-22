import { useState } from "react";
import { Search, MapPin, Phone, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import EmergencyBanner from "@/components/EmergencyBanner";
import { useBloodDonors } from "@/hooks/useBloodDonors";

const Donors = () => {
  const { donors, loading, filterDonors } = useBloodDonors();
  const [searchCity, setSearchCity] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const filteredDonors = filterDonors(selectedBloodGroup, searchCity);

  const handleSearch = () => {
    // Filter is automatically applied via filteredDonors
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">Loading donors...</div>
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
            Find Blood Donors
          </h1>
          <p className="text-xl text-muted-foreground">
            Search for blood donors by blood group and location
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search Donors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Blood Group</label>
                <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Blood Groups</SelectItem>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  type="text"
                  placeholder="Enter city name"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Available Donors ({filteredDonors.length})
          </h2>
        </div>

        {filteredDonors.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No donors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="blood-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{donor.name}</CardTitle>
                    <div className="text-2xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {donor.blood_group}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{donor.city}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-4 h-4 mr-2" />
                      <a 
                        href={`tel:${donor.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {donor.phone}
                      </a>
                    </div>
                    
                    {donor.email && (
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        <a 
                          href={`mailto:${donor.email}`}
                          className="hover:text-primary transition-colors truncate"
                        >
                          {donor.email}
                        </a>
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      Age: {donor.age} years
                    </div>
                    
                    {donor.last_donation_date && (
                      <div className="text-sm text-muted-foreground">
                        Last donation: {new Date(donor.last_donation_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full">
                      <a href={`tel:${donor.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Donor
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Donors;