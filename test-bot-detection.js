// Test script to verify bot detection charge API
async function testBotDetection() {
  try {
    console.log('Testing Stripe bot detection charge API...');
    
    const response = await fetch('http://localhost:3000/api/stripe/bot-charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token', // This will fail auth but we want to test the API structure
      },
      body: JSON.stringify({
        action: 'signup',
        userId: 'test-user-123'
      })
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
    
    if (response.ok) {
      console.log('✅ Bot detection API is working');
    } else {
      console.log('❌ Bot detection API returned error:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testBotDetection();
