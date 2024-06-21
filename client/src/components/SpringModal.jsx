import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid p-8 overflow-y-scroll cursor-pointer bg-slate-900/20 backdrop-blur place-items-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg p-6 overflow-hidden text-white rounded-lg shadow-xl cursor-default bg-gradient-to-br from-violet-600 to-indigo-600"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="grid w-16 h-16 mx-auto mb-2 text-3xl text-indigo-600 bg-white rounded-full place-items-center">
                <FiAlertCircle />
              </div>
              <h3 className="mb-2 text-3xl font-bold text-center">
                One more thing!
              </h3>
              <p className="mb-6 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                aperiam vitae, sapiente ducimus eveniet in velit.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 font-semibold text-white transition-colors bg-transparent rounded hover:bg-white/10"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 font-semibold text-indigo-600 transition-opacity bg-white rounded hover:opacity-90"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
