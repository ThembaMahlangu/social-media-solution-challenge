import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Loading your experience...",
  },
  {
    text: "Just a moment, making magic happen...",
  },
  {
    text: "Setting things up for you...",
  },
  {
    text: "Getting everything ready...",
  },
  {
    text: "Almost there...",
  },
  {
    text: "Hold tight, we’re preparing something special...",
  },
  {
    text: "Making sure everything’s perfect...",
  },
  {
    text: "Please wait, finalizing details...",
  },
];

export default function LoadingState(loading, setLoading) {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
