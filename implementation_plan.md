# ApnaBiz - 5 Advanced Features Implementation Plan

## Overview
This document outlines the implementation plan for 5 new advanced level features to enhance the ApnaBiz local business directory application.

---

## Feature 1: Instant Lead Request / Get Quote Modal

### Description
Interactive modal allowing customers to select requirements, date, budget and submit direct inquiry & discount quote requests to businesses.

### Technical Specifications

#### Frontend Components
- **Component**: `QuoteRequestModal.jsx` (Location: `app/components/`)
- **Trigger**: "Get Quote" button on business cards and business detail pages
- **Form Fields**:
  - Customer Name (text input)
  - Phone Number (tel input with validation)
  - Email Address (email input)
  - Service Requirements (textarea)
  - Preferred Date (date picker)
  - Budget Range (dropdown/select: ₹1k-5k, ₹5k-10k, ₹10k-25k, ₹25k-50k, ₹50k+)
  - Additional Notes (textarea - optional)

#### Backend API
- **Endpoint**: `POST /api/quote-request`
- **Request Body**:
  ```json
  {
    "businessId": "string",
    "customerId": "string (optional if not logged in)",
    "customerName": "string",
    "phone": "string",
    "email": "string",
    "requirements": "string",
    "preferredDate": "date",
    "budget": "string",
    "additionalNotes": "string"
  }
  ```
- **Response**: Success/error message with quote reference ID

#### Database Schema Changes
```prisma
model QuoteRequest {
  id          String   @id @default(cuid())
  businessId  String
  customerId  String?
  customerName String
  phone       String
  email       String
  requirements String
  preferredDate DateTime
  budget      String
  additionalNotes String?
  status      String   @default("pending") // pending, responded, completed
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  business    Business @relation(fields: [businessId], references: [id])
  customer    User?    @relation(fields: [customerId], references: [id])
}
```

#### UI/UX Requirements
- Modal with backdrop blur and smooth animations
- Form validation with real-time feedback
- Loading state during submission
- Success confirmation with reference number
- Responsive design for mobile/desktop

---

## Feature 2: Business Quick-View Drawer

### Description
Click on any business to open a drawer/popover showing full details including operating hours with "Open Now" badge, amenities (Wi-Fi, AC, Parking), Google Map location preview, and photo gallery.

### Technical Specifications

#### Frontend Components
- **Component**: `BusinessQuickViewDrawer.jsx` (Location: `app/components/`)
- **Trigger**: Click on business card in search results or category listings
- **Drawer Content**:
  - Business name & category
  - Rating stars with review count
  - "Open Now" / "Closed" badge (based on current time & operating hours)
  - Operating hours (Monday-Sunday schedule)
  - Amenities icons (Wi-Fi, AC, Parking, Cards Accepted, etc.)
  - Address with Google Maps embed preview
  - Photo gallery (swipeable carousel)
  - Quick action buttons: Call, Get Directions, Get Quote, Bookmark

#### Backend API
- **Endpoint**: `GET /api/business/[id]/quick-view`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "category": "string",
      "subCategory": "string",
      "rating": number,
      "reviewCount": number,
      "operatingHours": {
        "monday": "9:00 AM - 9:00 PM",
        "tuesday": "9:00 AM - 9:00 PM",
        // ... all days
      },
      "amenities": ["wifi", "ac", "parking", "cards"],
      "address": {
        "street": "string",
        "area": "string",
        "district": "string",
        "state": "string",
        "pincode": "string"
      },
      "location": {
        "lat": number,
        "lng": number
      },
      "photos": ["url1", "url2", "url3"],
      "phone": "string",
      "isOpen": boolean
    }
  }
  ```

#### Database Schema Changes
```prisma
model Business {
  // Existing fields...
  
  operatingHours Json?  // Store as JSON: {"monday": "9:00-21:00", ...}
  amenities       String[] // ["wifi", "ac", "parking", "cards", "wifi"]
  photos          String[] // Array of photo URLs
  locationLat     Float?
  locationLng     Float?
}

// Amenity options enum
enum Amenity {
  WIFI
  AC
  PARKING
  CARDS_ACCEPTED
  CASH_ON_DELIVERY
  HOME_DELIVERY
  OUTDOOR_SEATING
  INDOOR_SEATING
  KIDS_FRIENDLY
  PET_FRIENDLY
}
```

#### UI/UX Requirements
- Slide-in drawer from right side (desktop) or bottom sheet (mobile)
- Smooth animation with backdrop
- "Open Now" badge with green/gray color coding
- Interactive Google Maps preview (iframe)
- Photo gallery with swipe gestures
- Close button and click-outside-to-close behavior

---

## Feature 3: Interactive Star Rating & Customer Review System

### Description
Users can select 1-5 stars and submit reviews & ratings directly for businesses.

### Technical Specifications

#### Frontend Components
- **Component**: `RatingReviewModal.jsx` (Location: `app/components/`)
- **Component**: `StarRatingInput.jsx` (Location: `app/components/`) - Reusable star rating component
- **Features**:
  - Interactive 5-star selection with hover effects
  - Review title and detailed comment
  - Photo upload (optional, max 3 photos)
  - Tags/rating categories (optional: Service, Quality, Value)
  - Display existing reviews with pagination

#### Backend API
- **Endpoint**: `POST /api/reviews`
- **Request Body**:
  ```json
  {
    "businessId": "string",
    "userId": "string",
    "rating": number, // 1-5
    "title": "string",
    "comment": "string",
    "photos": ["string"], // optional
    "categories": {
      "service": number,
      "quality": number,
      "value": number
    }
  }
  ```
- **Endpoint**: `GET /api/business/[id]/reviews?page=1&limit=10`
- **Response**: Paginated reviews with user info

#### Database Schema Changes
```prisma
model Review {
  id          String   @id @default(cuid())
  businessId  String
  userId      String
  rating      Int      // 1-5
  title       String
  comment     String
  photos      String[]
  categories  Json?    // {"service": 5, "quality": 4, "value": 5}
  isVerified  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  business    Business @relation(fields: [businessId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
  
  @@unique([businessId, userId]) // One review per user per business
}

model Business {
  // Existing fields...
  
  averageRating Float?
  totalReviews  Int     @default(0)
  reviews       Review[]
}
```

#### UI/UX Requirements
- Star rating with animated fill on hover
- Real-time rating preview
- Form validation (minimum comment length)
- Photo upload with preview
- Review display with user avatar, date, helpful votes
- Sort reviews: Newest, Highest Rated, Most Helpful

---

## Feature 4: Bookmarks & Saved Businesses Manager

### Description
Heart icon to favorite/save businesses and view them in a header saved items drawer.

### Technical Specifications

#### Frontend Components
- **Component**: `BookmarkButton.jsx` (Location: `app/components/`) - Heart icon button
- **Component**: `SavedBusinessesDrawer.jsx` (Location: `app/components/`)
- **Navbar Update**: Add bookmark icon with badge count
- **Features**:
  - Toggle bookmark with heart animation
  - Persist bookmarks (localStorage + database if logged in)
  - Saved items drawer with grid/list view
  - Remove from bookmarks option
  - Quick actions from saved items

#### Backend API
- **Endpoint**: `POST /api/bookmarks` (add/remove)
- **Request Body**: `{ "businessId": "string" }`
- **Endpoint**: `GET /api/bookmarks`
- **Response**: Array of saved businesses
- **Endpoint**: `DELETE /api/bookmarks/[businessId]`

#### Database Schema Changes
```prisma
model Bookmark {
  id         String   @id @default(cuid())
  userId     String
  businessId String
  createdAt  DateTime @default(now())
  
  user       User     @relation(fields: [userId], references: [id])
  business   Business @relation(fields: [businessId], references: [id])
  
  @@unique([userId, businessId])
}

model User {
  // Existing fields...
  
  bookmarks  Bookmark[]
}
```

#### UI/UX Requirements
- Heart icon with fill/unfill animation
- Badge count on navbar bookmark icon
- Drawer slide-in from right
- Grid view of saved businesses with quick actions
- Empty state with illustration
- Sync between localStorage (guest) and database (logged in)

---

## Feature 5: Live Filters & Sorting Engine

### Description
Advanced filtering and sorting options for search results: Rating (4.0+ Stars), Verified Only, Open Now, and sorting by Highest Rated, Distance, Price.

### Technical Specifications

#### Frontend Components
- **Component**: `SearchFilters.jsx` (Location: `app/components/`)
- **Integration**: Update `SearchSection.jsx` to include filters
- **Filter Options**:
  - **Rating**: 4.0+, 3.5+, 3.0+, All
  - **Verified**: Verified Only toggle
  - **Status**: Open Now toggle
  - **Sort By**: Highest Rated, Nearest, Price (Low-High), Price (High-Low), Most Reviewed

#### Backend API Updates
- **Endpoint**: `GET /api/search` (enhanced)
- **Query Parameters**:
  ```
  ?keyword=restaurant
  &location=bhubaneswar
  &minRating=4.0
  &verifiedOnly=true
  &openNow=true
  &sortBy=highestRated
  &page=1
  &limit=20
  ```
- **Response**: Enhanced with distance calculation if location provided

#### Database Considerations
- Add indexes for filtering performance:
  - Index on `rating`, `isVerified`, `operatingHours`
- Distance calculation using PostGIS or Haversine formula
- Price level field (if not exists): `priceLevel` enum (1-4)

#### UI/UX Requirements
- Collapsible filter panel
- Active filter chips display
- Real-time filter application (debounced)
- Clear all filters button
- Filter count badge
- Smooth transitions when results update
- Mobile-friendly filter drawer

---

## Implementation Priority & Timeline

### Phase 1: Core Features (Week 1-2)
1. **Feature 4: Bookmarks** - Easiest to implement, high value
2. **Feature 3: Rating System** - Foundation for other features

### Phase 2: Enhanced UX (Week 3-4)
3. **Feature 2: Quick-View Drawer** - Improves user engagement
4. **Feature 1: Quote Modal** - Business value feature

### Phase 3: Advanced Search (Week 5)
5. **Feature 5: Filters & Sorting** - Complex, requires backend optimization

---

## Dependencies & Requirements

### New Packages to Install
```json
{
  "date-fns": "^3.0.0",           // For operating hours calculation
  "react-google-autocomplete": "^2.0.0", // For location input
  "swiper": "^12.0.0",            // Already installed, for galleries
  "lucide-react": "^1.25.0"      // Already installed, for icons
}
```

### Database Migration Steps
1. Add new fields to Business model
2. Create QuoteRequest, Review, Bookmark models
3. Run Prisma migration
4. Seed initial data for testing

---

## Testing Strategy

### Unit Tests
- Component rendering
- Form validation
- API endpoint responses

### Integration Tests
- End-to-end user flows
- Filter combinations
- Bookmark persistence

### Performance Tests
- Search with filters (large dataset)
- Image gallery loading
- Modal/drawer animations

---

## Success Metrics

- **Quote Requests**: Increase in lead generation by 30%
- **Quick-View**: 25% increase in business profile views
- **Reviews**: 50+ reviews in first month
- **Bookmarks**: 20% of users save at least 1 business
- **Filters**: 40% of searches use filters

---

## Notes & Considerations

- All modals/drawers should be accessible (keyboard navigation, ARIA labels)
- Implement loading skeletons for better perceived performance
- Add error boundaries for graceful failure handling
- Consider offline functionality for bookmarks
- Implement analytics tracking for feature usage
