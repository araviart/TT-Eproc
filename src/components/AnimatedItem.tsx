import { motion } from "framer-motion";

interface AnimatedItemProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const AnimatedItem = ({ isOpen, children }: AnimatedItemProps) => {
  return (
    <motion.div
      whileHover={{ color: "#1E293B" }} // slate-800
      animate={{ color: isOpen ? "#1E293B" : "#64748B" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem;
