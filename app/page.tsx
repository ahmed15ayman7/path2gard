import WelcomeCard from "@/components/cards/WelcomeCard";

export default function Home() {
  return (
   <div className="p-5">
    <WelcomeCard
  name="Ahmed"
  progress={1}
  isFirstTime={true}
/>
   </div>
  );
}
