# Database Setup Guide for Nexa

## 🚀 Quick Start

### Step 1: Install MongoDB

**Option A: Local MongoDB (Recommended for Development)**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB with default settings
3. MongoDB will run as a Windows Service automatically

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string

### Step 2: Create Environment File

Create a `.env` file in the `nexa_express` directory with:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nexa
MONGODB_URI_DONOR=mongodb://localhost:27017/nexa

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# PayHere Configuration
PAYHERE_MERCHANT_ID=1217129
PAYHERE_MERCHANT_SECRET=MzQ0NTU4NzE5MTMxMjE3MTI5OTUxMzE0ODUwMTE=
PAYHERE_SANDBOX=true
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000
```

### Step 3: Test Database Connection

1. Start your backend server:
   ```bash
   cd nexa_express
   npm run dev
   ```

2. You should see:
   ```
   MongoDB Connected: localhost
   Server running in development mode on port 5000
   ```

### Step 4: Test API Endpoints

Test your database with these endpoints:

**Register a Donor:**
```bash
curl -X POST http://localhost:5000/api/v1/donor/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "preferredCauses": ["education"],
    "donationFrequency": "monthly"
  }'
```

**Check Database:**
- Open MongoDB Compass (if installed)
- Connect to `mongodb://localhost:27017`
- Look for `nexa` database
- Check `donors` and `donations` collections

## 🔧 Troubleshooting

### Database Connection Issues:
1. **MongoDB not running**: Start MongoDB service
2. **Port 27017 in use**: Change MongoDB port
3. **Permission denied**: Run as administrator

### Common Errors:
- `MongoDB connection error`: Check if MongoDB is running
- `Authentication failed`: Check connection string
- `Database not found`: Database will be created automatically

## 📊 Database Schema

### Donors Collection:
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  preferredCauses: [String],
  donationFrequency: String,
  preferredCurrency: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Donations Collection:
```javascript
{
  _id: ObjectId,
  donor: ObjectId (ref: Donor),
  institution: ObjectId (ref: Institution),
  amount: Number,
  currency: String,
  donationType: String,
  purpose: String,
  paymentMethod: String,
  transactionId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Next Steps

1. **Test the connection** by starting your server
2. **Create some test data** using the API endpoints
3. **Check MongoDB Compass** to see your data
4. **Test the PayHere integration** with real database

Your database is now ready! 🚀
