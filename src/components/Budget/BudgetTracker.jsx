import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { databases } from '../../services/appwrite';
import { ID, Query } from 'appwrite';

const BudgetTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [budget, setBudget] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [form, setForm] = useState({
        name: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0]
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    // Fetch expenses
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    [Query.equal('userId', user.$id)]
                );
                
                const expensesList = response.documents;
                const total = expensesList.reduce((sum, expense) => sum + expense.amount, 0);
                
                setExpenses(expensesList);
                setTotalExpenses(total);
                setRemaining(budget - total);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching expenses:', error);
                setError('Failed to fetch expenses. Please try again.');
                setLoading(false);
            }
        };

        if (user) {
            fetchExpenses();
        }
    }, [user, budget]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newExpense = await databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    name: form.name,
                    amount: parseFloat(form.amount),
                    date: form.date
                }
            );

            setExpenses([...expenses, newExpense]);
            setTotalExpenses(totalExpenses + parseFloat(form.amount));
            setRemaining(budget - totalExpenses - parseFloat(form.amount));
            setForm({
                name: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0]
            });
            setSuccess('Expense added successfully!');
        } catch (error) {
            console.error('Error adding expense:', error);
            setError('Failed to add expense. Please try again.');
        }
    };

    // Handle budget change
    const handleBudgetChange = (e) => {
        const newBudget = parseFloat(e.target.value);
        setBudget(newBudget);
        setRemaining(newBudget - totalExpenses);
    };

    // Handle expense change
    const handleExpenseChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Handle expense deletion
    const handleDeleteExpense = async (expenseId) => {
        try {
            await databases.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                expenseId
            );

            const deletedExpense = expenses.find(expense => expense.$id === expenseId);
            setExpenses(expenses.filter(expense => expense.$id !== expenseId));
            setTotalExpenses(totalExpenses - deletedExpense.amount);
            setRemaining(remaining + deletedExpense.amount);
            setSuccess('Expense deleted successfully!');
        } catch (error) {
            console.error('Error deleting expense:', error);
            setError('Failed to delete expense. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Add your JSX for rendering the budget tracker UI */}
        </div>
    );
};

export default BudgetTracker;
