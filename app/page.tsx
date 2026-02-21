import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="max-w-4xl mx-auto px-6 py-12">
       <MultiStepForm />
      </main>
    </div>
  );
}
