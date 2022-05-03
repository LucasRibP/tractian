interface BaseState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

export default BaseState;
