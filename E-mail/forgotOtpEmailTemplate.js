const forgotOtpEmailTemplate = (user_name, otp) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f4f4;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                .header h1 {
                    font-size: 28px;
                    margin-bottom: 5px;
                }
                .content {
                    padding: 40px 30px;
                }
                .greeting {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                .otp-section {
                    background-color: #f9f9f9;
                    border-left: 4px solid #667eea;
                    padding: 20px;
                    margin: 30px 0;
                    border-radius: 4px;
                }
                .otp-label {
                    color: #666;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .otp-code {
                    font-size: 36px;
                    font-weight: bold;
                    color: #667eea;
                    letter-spacing: 5px;
                    text-align: center;
                    font-family: 'Courier New', monospace;
                    padding: 15px;
                    background-color: white;
                    border-radius: 4px;
                    border: 2px dashed #667eea;
                }
                .expires {
                    color: #e74c3c;
                    font-size: 13px;
                    margin-top: 10px;
                    text-align: center;
                    font-weight: 500;
                }
                .message {
                    color: #555;
                    font-size: 14px;
                    line-height: 1.8;
                    margin: 20px 0;
                }
                .security-tip {
                    background-color: #e8f4f8;
                    border-left: 4px solid #3498db;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 4px;
                    font-size: 13px;
                    color: #2c3e50;
                    line-height: 1.6;
                }
                .security-tip strong {
                    color: #2c3e50;
                }
                .footer {
                    background-color: #f4f4f4;
                    color: #888;
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    line-height: 1.6;
                    border-top: 1px solid #ddd;
                }
                .footer a {
                    color: #667eea;
                    text-decoration: none;
                }
                .divider {
                    height: 1px;
                    background-color: #ddd;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="header">
                    <h1>Password Reset</h1>
                    <p>Secure Verification Code</p>
                </div>
 
                <!-- Content -->
                <div class="content">
                    <div class="greeting">
                        Hi <strong>${user_name}</strong>,
                    </div>
 
                    <p class="message">
                        We received a request to reset your password. Use the verification code below to proceed with resetting your password.
                    </p>
 
                    <!-- OTP Section -->
                    <div class="otp-section">
                        <div class="otp-label">Your Verification Code</div>
                        <div class="otp-code">${otp}</div>
                        <div class="expires">⏱This code expires in 5 minutes</div>
                    </div>
 
                    <p class="message">
                        Enter this code in the password reset form to verify your identity and create a new password.
                    </p>
 
                    <!-- Security Tip -->
                    <div class="security-tip">
                        <strong>Security Tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
                    </div>
 
                    <!-- Additional Help -->
                    <p class="message">
                        <strong>Didn't request a password reset?</strong><br>
                        If you didn't request this code, please ignore this email. Your account is secure.
                    </p>
 
                    <div class="divider"></div>
 
                    <p class="message" style="font-size: 12px; color: #888;">
                        <strong>Need help?</strong> Contact our support team at support@yourcompany.com
                    </p>
                </div>
 
                <!-- Footer -->
                <div class="footer">
                    <p>© 2024 Wafrah Bazar. All rights reserved.</p>
                    <p>This is an automated email. Please do not reply.</p>
                </div>
            </div>
        </body>
        </html>`
}
 
module.exports = forgotOtpEmailTemplate
 