import { TransactionProvider } from "@/hooks/Transaction/Transaction";
import Home from "./Home";

const HomeContainer = () => (
  <TransactionProvider>
    <Home />
  </TransactionProvider>
);

export default HomeContainer;
