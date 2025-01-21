// 'use client';

// import { motion } from 'framer-motion';

// export default function ReimbursePage() {
//   const transactions = [
//     { id: 1, amount: '$150', date: '2024-03-15', status: 'Completed' },
//     { id: 2, amount: '$200', date: '2024-03-14', status: 'Pending' },
//     { id: 3, amount: '$75', date: '2024-03-13', status: 'Failed' },
//   ];

//   return (
//     <div className="p-6">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="max-w-2xl mx-auto"
//       >
//         <h1 className="text-3xl font-bold mb-8">Reimbursement Management</h1>
        
//         <div className="space-y-4">
//           {transactions.map((transaction, index) => (
//             <motion.div
//               key={transaction.id}
//               initial={{ y: 20 }}
//               animate={{ y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex items-center justify-between"
//             >
//               <div>
//                 <p className="font-semibold">{transaction.amount}</p>
//                 <p className="text-gray-600 dark:text-gray-400">{transaction.date}</p>
//               </div>
//               <span className={`px-3 py-1 rounded-full ${
//                 transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
//                 transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {transaction.status}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaPlus } from 'react-icons/fa';

// Define a type for the transaction status
type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export default function ReimbursePage() {
  const transactions = [
    { id: 1, amount: '$150', date: '2024-03-15', status: 'Completed' as TransactionStatus },
    { id: 2, amount: '$200', date: '2024-03-14', status: 'Pending' as TransactionStatus },
    { id: 3, amount: '$75', date: '2024-03-13', status: 'Failed' as TransactionStatus },
    { id: 4, amount: '$350', date: '2024-03-12', status: 'Completed' as TransactionStatus },
    { id: 5, amount: '$80', date: '2024-03-15', status: 'Pending' as TransactionStatus },
  ];

  // Define the type for the status parameter
  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'Completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'Pending':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'Failed':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <FaPlus className="text-2xl" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Reimbursement Management</h1>

        <div className="space-y-6">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {getStatusIcon(transaction.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{transaction.amount}</p>
                    <p className="text-gray-500 text-sm">{transaction.date}</p>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}