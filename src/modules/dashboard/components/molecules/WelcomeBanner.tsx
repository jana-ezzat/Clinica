import { GiStethoscope } from "react-icons/gi";

type Props = {
  doctorName: string;
};

export default function WelcomeBanner({ doctorName }: Props) {
  return (
    <div
      className="relative flex flex-1 items-center overflow-hidden rounded-xl px-6 py-6"
      style={{
        background:
          "linear-gradient(90deg, var(--ds-button-primary) 0%, color-mix(in srgb, var(--ds-button-primary) 40%, var(--ds-card-background)) 100%)",
      }}>
      <GiStethoscope
        size={90}
        className="absolute end-6 top-1/2 -translate-y-1/2 text-white/25"
      />
      <div className="relative w-full">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          مرحبا {doctorName}
        </h2>
        <p className="mt-1 text-sm text-white/80">إليك ملخص عيادتك اليوم</p>
      </div>
    </div>
  );
}
