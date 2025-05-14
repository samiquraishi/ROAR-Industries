import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { skills } from "@/constants/skills";
import { useState } from "react";
import { toast } from "react-hot-toast";

export function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fieldOfInterest: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Enquiry submitted successfully!');
        setFormData({
          name: '',
          email: '',
          fieldOfInterest: '',
          message: ''
        });
        if (onSuccess) onSuccess();
      } else {
        toast.error('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      // Changed variable name from 'error' to 'err' and actually using it
      console.error('Error submitting form:', err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      fieldOfInterest: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        name="name"
        placeholder="Name" 
        required 
        className="border-amber-400 focus-visible:ring-0"
        value={formData.name}
        onChange={handleChange}
      />
      <Input 
        name="email"
        type="email" 
        placeholder="Email" 
        required 
        className="border-amber-400 focus-visible:ring-0"
        value={formData.email}
        onChange={handleChange}
      />
      <Select 
        required 
        value={formData.fieldOfInterest}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="border-amber-400 focus-visible:ring-0">
          <SelectValue placeholder="Field of Interest" />
        </SelectTrigger>
        <SelectContent>
          {skills.map((s) => (
            <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea 
        name="message"
        placeholder="Message" 
        rows={4} 
        required 
        className="border-amber-400 focus-visible:ring-0"
        value={formData.message}
        onChange={handleChange}
      />
      <Button 
        type="submit" 
        className="w-full font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}