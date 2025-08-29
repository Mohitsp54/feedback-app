#!/bin/bash
# Test script for deployed Render services

echo "🧪 Testing Deployed Services..."
echo "================================"

# Replace these with your actual deployed URLs
BACKEND_URL="https://your-backend-name.onrender.com"
FRONTEND_URL="https://your-frontend-name.onrender.com"

echo "📡 Testing Backend Health..."
curl -s "$BACKEND_URL/health" | jq '.'

echo ""
echo "📊 Testing Feedback API..."
curl -s "$BACKEND_URL/api/feedback" | jq '.'

echo ""
echo "🌐 Testing Frontend..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
echo "Frontend HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Frontend is accessible"
else
    echo "❌ Frontend has issues (Status: $HTTP_STATUS)"
fi

echo ""
echo "📝 Test POST request..."
curl -X POST "$BACKEND_URL/api/feedback" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Feedback",
    "description": "This is a test feedback from deployment script",
    "category": "Bug"
  }' | jq '.'

echo ""
echo "✅ Test completed!"
echo "If you see data above, your deployment is working! 🎉"
