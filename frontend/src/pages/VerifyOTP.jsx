import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { verifyOTP, resendOTP } from '../api/auth';

function VerifyOTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await verifyOTP(otp);
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await resendOTP();
            toast.success(response.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to resend OTP'
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Verify OTP
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Verify
                    </button>
                </form>
                <button
                    onClick={handleResendOTP}
                    className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                    Resend OTP
                </button>
            </div>
        </div>
    );
}

export default VerifyOTP;
