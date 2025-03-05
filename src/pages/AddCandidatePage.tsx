import { AddCandidateForm } from '@/components/shared/auth/Add-candidate-form';

export default function CandidatePage() {
  return (
    <div className="grid  min-h-[calc(100vh-4.1rem)] lg:grid-cols-2 ">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <AddCandidateForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/photo8.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
