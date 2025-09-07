#!/bin/bash
set -e

BASE_URL="http://localhost:8080/api"

print_step() {
  echo ""
  echo "============================================================"
  echo "➡️  $1"
  echo "============================================================"
}

# 1. Login and extract token using sed
print_step "Logging in..."
LOGIN_BODY='{
  "username": "hamza",
  "email": "hamza@example.com",
  "password": "123456"
}'
echo "Request: $LOGIN_BODY"

LOGIN_RESPONSE=$(curl -s --location "$BASE_URL/auth/login" \
  --header 'Content-Type: application/json' \
  --data-raw "$LOGIN_BODY")

echo "Response: $LOGIN_RESPONSE"

TOKEN=$(echo "$LOGIN_RESPONSE" | sed -n 's/.*"access_token":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token"
  exit 1
fi

echo "✅ Got token: $TOKEN"

# 2. Create transactions with different card brands
for brand in Visa Mastercard Amex Discover DinersClub; do
  print_step "Creating transaction with card brand: $brand"

  TX_BODY="{
    \"amount\": $(( RANDOM % 500 + 10 )),
    \"currency\": \"USD\",
    \"pgextrainfo\": {
      \"cardBrand\": \"$brand\",
      \"cardLast4\": \"$((1000 + RANDOM % 9000))\"
    }
  }"

  echo "Request: $TX_BODY"

  TX_RESPONSE=$(curl -s --location "$BASE_URL/transactions/create" \
    --header "Authorization: Bearer $TOKEN" \
    --header "Content-Type: application/json" \
    --data "$TX_BODY")

  echo "Response: $TX_RESPONSE"
done

# 3. Get all transactions
print_step "Listing all transactions..."
ALL_RESPONSE=$(curl -s --location "$BASE_URL/transactions/all" \
  --header "Authorization: Bearer $TOKEN")
echo "Response: $ALL_RESPONSE"

# 4. Get transactions by user
print_step "Listing user transactions..."
USER_RESPONSE=$(curl -s --location "$BASE_URL/transactions/user" \
  --header "Authorization: Bearer $TOKEN")
echo "Response: $USER_RESPONSE"

# 5. Filter transactions
print_step "Filtering transactions..."
FILTER_BODY='{
  "min": 100,
  "max": 500,
  "minDate": "2025-09-01T00:00:00.000Z",
  "maxDate": "2025-09-07T23:59:59.000Z",
  "status": "failed",
  "cardBrand": "Visa"
}'
echo "Request: $FILTER_BODY"

FILTER_RESPONSE=$(curl -s --location "$BASE_URL/transactions/filter" \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data "$FILTER_BODY")

echo "Response: $FILTER_RESPONSE"

# 6. Daily report
print_step "Daily report..."
REPORT_RESPONSE=$(curl -s --location "$BASE_URL/transactions/report/daily" \
  --header "Authorization: Bearer $TOKEN")
echo "Response: $REPORT_RESPONSE"
