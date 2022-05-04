interface BaseState<T> {
  data?: T;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
}

export default BaseState;
