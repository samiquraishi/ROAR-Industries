import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { skills } from "@/constants/skills";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .regex(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    ),
  fieldOfInterest: z.string().min(1, "Field of interest is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

// Custom hook for form handling
const useEnquiryForm = (onSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success('Enquiry submitted successfully!');
        reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setValue('fieldOfInterest', value, { shouldValidate: true });
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
    watch,
    handleSelectChange,
    onSubmit
  };
};

// Form Field Components
const FormField = ({ children, error }: { children: React.ReactNode; error?: string }) => (
  <div className="space-y-2">
    {children}
    {error && (
      <p className="text-sm text-red-500">{error}</p>
    )}
  </div>
);

const NameField = ({ register, error }: { register: any; error?: string }) => (
  <FormField error={error}>
    <Input 
      {...register('name')}
      placeholder="Name" 
      className="border-amber-400 focus-visible:ring-0"
      aria-invalid={!!error}
    />
  </FormField>
);

const EmailField = ({ register, error }: { register: any; error?: string }) => (
  <FormField error={error}>
    <Input 
      {...register('email')}
      type="email" 
      placeholder="Email" 
      className="border-amber-400 focus-visible:ring-0"
      aria-invalid={!!error}
    />
  </FormField>
);

const FieldOfInterestSelect = ({ 
  value, 
  onValueChange, 
  error 
}: { 
  value: string; 
  onValueChange: (value: string) => void; 
  error?: string;
}) => (
  <FormField error={error}>
    <Select 
      value={value}
      onValueChange={onValueChange}
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
  </FormField>
);

const MessageField = ({ register, error }: { register: any; error?: string }) => (
  <FormField error={error}>
    <Textarea 
      {...register('message')}
      placeholder="Message" 
      rows={4} 
      className="border-amber-400 focus-visible:ring-0"
      aria-invalid={!!error}
    />
  </FormField>
);

export function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
    watch,
    handleSelectChange,
    onSubmit
  } = useEnquiryForm(onSuccess);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <NameField 
        register={register} 
        error={errors.name?.message} 
      />
      
      <EmailField 
        register={register} 
        error={errors.email?.message} 
      />
      
      <FieldOfInterestSelect 
        value={watch('fieldOfInterest')}
        onValueChange={handleSelectChange}
        error={errors.fieldOfInterest?.message}
      />
      
      <MessageField 
        register={register} 
        error={errors.message?.message} 
      />

      <Button 
        type="submit" 
        className="w-full font-semibold"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}