// Test script for Clerk webhook
// This simulates the webhook payload that Clerk sends

const testWebhook = async () => {
  const testPayload = {
    type: 'user.created',
    data: {
      id: 'user_test_12345',
      email_addresses: [
        {
          email_address: 'test@example.com'
        }
      ]
    }
  };

  try {
    const response = await fetch('http://localhost:3000/api/webhooks/clerk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();
    console.log('Webhook test result:', result);
    
    if (result.success) {
      console.log('✅ Webhook test passed - User profile created successfully');
    } else {
      console.log('❌ Webhook test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Webhook test error:', error);
  }
};

// Run the test
testWebhook();
