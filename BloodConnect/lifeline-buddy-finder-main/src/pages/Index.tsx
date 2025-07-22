import { Heart, Users, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import EmergencyBanner from "@/components/EmergencyBanner";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Find Blood Donors",
      description: "Search for blood donors by blood group and location",
      link: "/donors",
      buttonText: "Search Donors"
    },
    {
      icon: Calendar,
      title: "Donation Camps",
      description: "Find and register for blood donation camps near you",
      link: "/camps",
      buttonText: "View Camps"
    },
    {
      icon: Heart,
      title: "Register as Donor",
      description: "Join our community of life-saving blood donors",
      link: "/register",
      buttonText: "Register Now"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Registered Donors" },
    { number: "500+", label: "Lives Saved" },
    { number: "50+", label: "Cities Covered" },
    { number: "24/7", label: "Emergency Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
          <div className="container mx-auto px-4 relative">
            <EmergencyBanner />
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Save Lives with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                  BloodConnect
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect blood donors with those in need. Our platform makes finding and registering blood donors simple, fast, and reliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/donors">
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Donors
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">
                    <Heart className="w-5 h-5 mr-2" />
                    Become a Donor
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-t bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How BloodConnect Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides three main services to connect blood donors with those in need
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="blood-card group hover:border-primary/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild className="w-full">
                      <Link to={feature.link}>
                        {feature.buttonText}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Save Lives?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are already making a difference. Your blood donation can save up to three lives.
            </p>
            <Button asChild size="lg" className="btn-primary">
              <Link to="/register">
                Register as Blood Donor
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="text-lg font-semibold">BloodConnect</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 BloodConnect. Connecting lives through blood donation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;