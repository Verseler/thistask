import AppIcon from "@/assets/images/logo/appIcon.png";

export default function AppLogo() {
  return (
    <div className="flex items-center gap-x-2">
      <img src={AppIcon} alt="app logo" className="size-10" />
      <span
        aria-label="app title"
        className="hidden text-2xl font-medium md:inline"
      >
        <span className="text-primary-500">This</span>Task
      </span>
    </div>
  );
}
