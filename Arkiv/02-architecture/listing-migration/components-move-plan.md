# Component Move Plan

## Summary

- **UI Package Candidates**: 78
- **Platform Package Candidates**: 53

### By Effort

- **Small (S)**: 55 components
- **Medium (M)**: 55 components
- **Large (L)**: 21 components

## UI Package Candidates

### ListingCardSkeleton

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/Card/ListingCardSkeleton.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { ListingCardSkeleton } from './components/Card/ListingCardSkeleton';
```

### ListingListItemSkeleton

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/patterns/tables/ListingListItemSkeleton.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { ListingListItemSkeleton } from './components/ListingListItemSkeleton';
```

### ListingGridSkeleton

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/ListingGridSkeleton.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { ListingGridSkeleton } from './components/ListingGridSkeleton';
```

### ListingListSkeleton

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/patterns/tables/ListingListSkeleton.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { ListingListSkeleton } from './components/ListingListSkeleton';
```

### PageSpinner

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/PageSpinner.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { PageSpinner } from './components/PageSpinner';
```

### Spinner

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/Spinner.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { Spinner } from './components/Spinner';
```

### LocalizedSelect

- **Current**: `apps/web/src/components/common/LocalizedSelect.tsx`
- **Target**: `packages/ui/src/components/LocalizedSelect.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { LocalizedSelect } from './components/LocalizedSelect';
```

### FilterSection

- **Current**: `apps/web/src/components/filters/FilterSection.tsx`
- **Target**: `packages/ui/src/components/filters/FilterSection.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { FilterSection } from './components/filters/FilterSection';
```

### GlobalSearch

- **Current**: `apps/web/src/components/search/GlobalSearch.tsx`
- **Target**: `packages/ui/src/components/GlobalSearch.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { GlobalSearch } from './components/GlobalSearch';
```

### FilterToggleButton

- **Current**: `apps/web/src/components/features/filters/FilterToggleButton.tsx`
- **Target**: `packages/ui/src/components/Button/FilterToggleButton.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { FilterToggleButton } from './components/filters/FilterToggleButton';
```

### EventDetailsModal

- **Current**: `apps/web/src/components/features/calendar/components/EventDetailsModal.tsx`
- **Target**: `packages/ui/src/components/patterns/modals/EventDetailsModal.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { EventDetailsModal } from './components/patterns/modals/EventDetailsModal';
```

### EventDetailRow

- **Current**: `apps/web/src/components/features/calendar/components/EventDetailsModal.tsx`
- **Target**: `packages/ui/src/components/EventDetailRow.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { EventDetailRow } from './components/EventDetailRow';
```

### StatusBadge

- **Current**: `apps/web/src/components/features/calendar/components/EventDetailsModal.tsx`
- **Target**: `packages/ui/src/components/patterns/status/StatusBadge.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { StatusBadge } from './components/StatusBadge';
```

### EventTooltip

- **Current**: `apps/web/src/components/features/calendar/components/EventTooltip.tsx`
- **Target**: `packages/ui/src/components/EventTooltip.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { EventTooltip } from './components/EventTooltip';
```

### BookingModeSelector

- **Current**: `apps/web/src/components/features/listings/components/BookingModeSelector.tsx`
- **Target**: `packages/ui/src/components/BookingModeSelector.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { BookingModeSelector } from './components/BookingModeSelector';
```

### AdminSearchField

- **Current**: `apps/web/src/components/features/search/components/AdminSearchField.tsx`
- **Target**: `packages/ui/src/components/forms/AdminSearchField.tsx`
- **Effort**: S
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/common

**Public Export**:
```typescript
export { AdminSearchField } from './components/AdminSearchField';
```

### SearchFilter

- **Current**: `apps/web/src/components/features/search/components/SearchFilters.tsx`
- **Target**: `packages/ui/src/components/filters/SearchFilter.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { SearchFilter } from './components/filters/SearchFilter';
```

### UserSearchField

- **Current**: `apps/web/src/components/features/search/components/UserSearchField.tsx`
- **Target**: `packages/ui/src/components/forms/UserSearchField.tsx`
- **Effort**: S
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/common

**Public Export**:
```typescript
export { UserSearchField } from './components/UserSearchField';
```

### BookingActionButtons

- **Current**: `apps/web/src/components/features/bookings/components/BookingForm/BookingActionButtons.tsx`
- **Target**: `packages/ui/src/components/Button/BookingActionButtons.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { BookingActionButtons } from './components/BookingActionButtons';
```

### MobileBookingPanel

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/MobileBookingPanel.tsx`
- **Target**: `packages/ui/src/components/MobileBookingPanel.tsx`
- **Effort**: S
- **Confidence**: 90%

**Public Export**:
```typescript
export { MobileBookingPanel } from './components/MobileBookingPanel';
```

### GalleryGrid

- **Current**: `apps/web/src/components/features/listings/components/ListingImageGallery/GalleryGrid.tsx`
- **Target**: `packages/ui/src/components/GalleryGrid.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { GalleryGrid } from './components/GalleryGrid';
```

### GalleryModal

- **Current**: `apps/web/src/components/features/listings/components/ListingImageGallery/GalleryModal.tsx`
- **Target**: `packages/ui/src/components/patterns/modals/GalleryModal.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { GalleryModal } from './components/patterns/modals/GalleryModal';
```

### ViewToggle

- **Current**: `apps/web/src/components/features/listings/components/ListingEditForm/ViewToggle.tsx`
- **Target**: `packages/ui/src/components/ViewToggle.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { ViewToggle } from './components/ViewToggle';
```

### ListingMiniMap

- **Current**: `apps/web/src/components/features/listings/components/ListingMap/ListingMiniMap.tsx`
- **Target**: `packages/ui/src/components/ListingMiniMap.tsx`
- **Effort**: S
- **Confidence**: 95%

**Public Export**:
```typescript
export { ListingMiniMap } from './components/ListingMiniMap';
```

### SummaryCard

- **Current**: `apps/web/src/components/features/listings/components/checkout/ConfirmTab.tsx`
- **Target**: `packages/ui/src/components/Card/SummaryCard.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { SummaryCard } from './components/Card/SummaryCard';
```

### PriceCard

- **Current**: `apps/web/src/components/features/listings/components/checkout/ConfirmTab.tsx`
- **Target**: `packages/ui/src/components/Card/PriceCard.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { PriceCard } from './components/Card/PriceCard';
```

### TermsCheckbox

- **Current**: `apps/web/src/components/features/listings/components/checkout/ConfirmTab.tsx`
- **Target**: `packages/ui/src/components/TermsCheckbox.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { TermsCheckbox } from './components/TermsCheckbox';
```

### ActorTypeSelector

- **Current**: `apps/web/src/components/features/listings/components/checkout/DetailsTab.tsx`
- **Target**: `packages/ui/src/components/ActorTypeSelector.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { ActorTypeSelector } from './components/ActorTypeSelector';
```

### AdditionalInfoInput

- **Current**: `apps/web/src/components/features/listings/components/checkout/DetailsTab.tsx`
- **Target**: `packages/ui/src/components/forms/AdditionalInfoInput.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { AdditionalInfoInput } from './components/AdditionalInfoInput';
```

### SlotCard

- **Current**: `apps/web/src/components/features/listings/components/checkout/SlotsTab.tsx`
- **Target**: `packages/ui/src/components/Card/SlotCard.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { SlotCard } from './components/Card/SlotCard';
```

### StepBadge

- **Current**: `apps/web/src/components/features/listings/components/checkout/TabNav.tsx`
- **Target**: `packages/ui/src/components/patterns/status/StepBadge.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { StepBadge } from './components/StepBadge';
```

### ProgressLine

- **Current**: `apps/web/src/components/features/listings/components/checkout/TabNav.tsx`
- **Target**: `packages/ui/src/components/ProgressLine.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { ProgressLine } from './components/ProgressLine';
```

### StepProgressIndicator

- **Current**: `apps/web/src/components/features/bookings/components/StepByStepBooking/components/StepProgressIndicator.tsx`
- **Target**: `packages/ui/src/components/StepProgressIndicator.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { StepProgressIndicator } from './components/StepProgressIndicator';
```

### Step4Terms

- **Current**: `apps/web/src/components/features/bookings/components/StepByStepBooking/steps/Step4Terms.tsx`
- **Target**: `packages/ui/src/components/Step4Terms.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { Step4Terms } from './components/Step4Terms';
```

### Step5Actions

- **Current**: `apps/web/src/components/features/bookings/components/StepByStepBooking/steps/Step5Actions.tsx`
- **Target**: `packages/ui/src/components/Step5Actions.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { Step5Actions } from './components/Step5Actions';
```

### AppRouter

- **Current**: `apps/web/src/components/AppRouter.tsx`
- **Target**: `packages/ui/src/components/AppRouter.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { AppRouter } from './components/AppRouter';
```

### ImageSlider

- **Current**: `apps/web/src/components/common/ImageSlider.tsx`
- **Target**: `packages/ui/src/components/ImageSlider.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { ImageSlider } from './components/ImageSlider';
```

### MobileDrawer

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/MobileDrawer.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { MobileDrawer } from './components/MobileDrawer';
```

### DesktopDrawer

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/DesktopDrawer.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DesktopDrawer } from './components/DesktopDrawer';
```

### DrawerHeader

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/DrawerHeader.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DrawerHeader } from './components/DrawerHeader';
```

### DrawerFooter

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/DrawerFooter.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DrawerFooter } from './components/DrawerFooter';
```

### BackButton

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/Button/BackButton.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { BackButton } from './components/BackButton';
```

### NextButton

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/Button/NextButton.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { NextButton } from './components/NextButton';
```

### SubmitButton

- **Current**: `apps/web/src/components/features/listings/components/BookingCartDrawer.tsx`
- **Target**: `packages/ui/src/components/Button/SubmitButton.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { SubmitButton } from './components/SubmitButton';
```

### SeasonRentalForm

- **Current**: `apps/web/src/components/features/listings/components/SeasonRentalForm.tsx`
- **Target**: `packages/ui/src/components/SeasonRentalForm.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { SeasonRentalForm } from './components/SeasonRentalForm';
```

### SearchFilter

- **Current**: `apps/web/src/components/features/search/components/SearchFilter.tsx`
- **Target**: `packages/ui/src/components/filters/SearchFilter.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { SearchFilter } from './components/filters/SearchFilter';
```

### FileUpload

- **Current**: `apps/web/src/components/features/support/components/SupportTicketForm.tsx`
- **Target**: `packages/ui/src/components/FileUpload.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { FileUpload } from './components/FileUpload';
```

### SupportTicketForm

- **Current**: `apps/web/src/components/features/support/components/SupportTicketForm.tsx`
- **Target**: `packages/ui/src/components/SupportTicketForm.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { SupportTicketForm } from './components/SupportTicketForm';
```

### BookingTypeSelector

- **Current**: `apps/web/src/components/features/bookings/components/BookingForm/BookingTypeSelector.tsx`
- **Target**: `packages/ui/src/components/BookingTypeSelector.tsx`
- **Effort**: M
- **Confidence**: 95%

**Forbidden Imports to Remove**:
- `@/types/booking`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { BookingTypeSelector } from './components/BookingTypeSelector';
```

### PriceCalculation

- **Current**: `apps/web/src/components/features/bookings/components/BookingForm/PriceCalculation.tsx`
- **Target**: `packages/ui/src/components/PriceCalculation.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { PriceCalculation } from './components/PriceCalculation';
```

### SelectedSlotsDisplay

- **Current**: `apps/web/src/components/features/bookings/components/BookingForm/SelectedSlotsDisplay.tsx`
- **Target**: `packages/ui/src/components/SelectedSlotsDisplay.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { SelectedSlotsDisplay } from './components/SelectedSlotsDisplay';
```

### EnhancedCalendar

- **Current**: `apps/web/src/components/features/calendar/components/EnhancedCalendar/index.tsx`
- **Target**: `packages/ui/src/components/EnhancedCalendar.tsx`
- **Effort**: M
- **Confidence**: 90%

**Public Export**:
```typescript
export { EnhancedCalendar } from './components/EnhancedCalendar';
```

### ListingCardBase

- **Current**: `apps/web/src/components/features/listings/components/ListingCard/ListingCardBase.tsx`
- **Target**: `packages/ui/src/components/Card/ListingCardBase.tsx`
- **Effort**: M
- **Confidence**: 95%

**Required Refactors**:
- Extract domain hooks: useListingTypeTranslation

**Public Export**:
```typescript
export { ListingCardBase } from './components/Card/ListingCardBase';
```

### ListingCardHeader

- **Current**: `apps/web/src/components/features/listings/components/ListingCard/ListingCardHeader.tsx`
- **Target**: `packages/ui/src/components/Card/ListingCardHeader.tsx`
- **Effort**: M
- **Confidence**: 90%

**Public Export**:
```typescript
export { ListingCardHeader } from './components/Card/ListingCardHeader';
```

### AdminListingCard

- **Current**: `apps/web/src/components/features/listings/components/ListingEditForm/AdminListingCard.tsx`
- **Target**: `packages/ui/src/components/Card/AdminListingCard.tsx`
- **Effort**: M
- **Confidence**: 95%

**Required Refactors**:
- Extract domain hooks: useListingManagement

**Public Export**:
```typescript
export { AdminListingCard } from './components/Card/AdminListingCard';
```

### FieldConfigModal

- **Current**: `apps/web/src/components/features/listings/components/ListingEditForm/FieldConfigModal.tsx`
- **Target**: `packages/ui/src/components/forms/FieldConfigModal.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { FieldConfigModal } from './components/patterns/modals/FieldConfigModal';
```

### MapContainer

- **Current**: `apps/web/src/components/features/listings/components/ListingMap/MapContainer.tsx`
- **Target**: `packages/ui/src/components/MapContainer.tsx`
- **Effort**: M
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/hooks/features/listings`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { MapContainer } from './components/MapContainer';
```

### ListingList

- **Current**: `apps/web/src/components/features/listings/components/ListingSearch/ListingList.tsx`
- **Target**: `packages/ui/src/components/patterns/tables/ListingList.tsx`
- **Effort**: M
- **Confidence**: 90%

**Forbidden Imports to Remove**:
- `@/types/listing`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { ListingList } from './components/ListingList';
```

### InfiniteScrollListings

- **Current**: `apps/web/src/components/features/listings/components/ListingSearch/InfiniteScrollListings.tsx`
- **Target**: `packages/ui/src/components/InfiniteScrollListings.tsx`
- **Effort**: M
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/types/listing`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { InfiniteScrollListings } from './components/InfiniteScrollListings';
```

### AmenityGrid

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/components/AmenityGrid.tsx`
- **Target**: `packages/ui/src/components/AmenityGrid.tsx`
- **Effort**: M
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/utils/listing/amenityIconUtils`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { AmenityGrid } from './components/AmenityGrid';
```

### BookingFiltersBar

- **Current**: `apps/web/src/components/features/bookings/components/BookingFiltersBar.tsx`
- **Target**: `packages/ui/src/components/filters/BookingFiltersBar.tsx`
- **Effort**: L
- **Confidence**: 95%

**Forbidden Imports to Remove**:
- `@/hooks/bookings`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { BookingFiltersBar } from './components/filters/BookingFiltersBar';
```

### CreateThreadModal

- **Current**: `apps/web/src/components/features/messaging/components/CreateThreadModal.tsx`
- **Target**: `packages/ui/src/components/patterns/modals/CreateThreadModal.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/stores/messageStore`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { CreateThreadModal } from './components/patterns/modals/CreateThreadModal';
```

### ThreadCard

- **Current**: `apps/web/src/components/features/messaging/components/MessageInbox.tsx`
- **Target**: `packages/ui/src/components/Card/ThreadCard.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/stores/messageStore`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { ThreadCard } from './components/Card/ThreadCard';
```

### MessageInbox

- **Current**: `apps/web/src/components/features/messaging/components/MessageInbox.tsx`
- **Target**: `packages/ui/src/components/MessageInbox.tsx`
- **Effort**: L
- **Confidence**: 90%

**Forbidden Imports to Remove**:
- `@/stores/messageStore`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { MessageInbox } from './components/MessageInbox';
```

### MessageBubble

- **Current**: `apps/web/src/components/features/messaging/components/MessageThread.tsx`
- **Target**: `packages/ui/src/components/MessageBubble.tsx`
- **Effort**: L
- **Confidence**: 90%

**Forbidden Imports to Remove**:
- `@/stores/messageStore`
- `@/contexts/hooks`

**Required Refactors**:
- Remove 2 forbidden import(s)

**Public Export**:
```typescript
export { MessageBubble } from './components/MessageBubble';
```

### MessageThread

- **Current**: `apps/web/src/components/features/messaging/components/MessageThread.tsx`
- **Target**: `packages/ui/src/components/MessageThread.tsx`
- **Effort**: L
- **Confidence**: 90%

**Forbidden Imports to Remove**:
- `@/stores/messageStore`
- `@/contexts/hooks`

**Required Refactors**:
- Remove 2 forbidden import(s)

**Public Export**:
```typescript
export { MessageThread } from './components/MessageThread';
```

### TicketCard

- **Current**: `apps/web/src/components/features/support/components/SupportTicketList.tsx`
- **Target**: `packages/ui/src/components/Card/TicketCard.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/stores/supportStore`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { TicketCard } from './components/Card/TicketCard';
```

### SupportTicketList

- **Current**: `apps/web/src/components/features/support/components/SupportTicketList.tsx`
- **Target**: `packages/ui/src/components/patterns/tables/SupportTicketList.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/stores/supportStore`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { SupportTicketList } from './components/SupportTicketList';
```

### DurationLabel

- **Current**: `apps/web/src/components/features/bookings/components/BookingCard/BookingDetailsPanel.tsx`
- **Target**: `packages/ui/src/components/DurationLabel.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/services/api/types`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { DurationLabel } from './components/DurationLabel';
```

### BookingDetailsPanel

- **Current**: `apps/web/src/components/features/bookings/components/BookingCard/BookingDetailsPanel.tsx`
- **Target**: `packages/ui/src/components/BookingDetailsPanel.tsx`
- **Effort**: L
- **Confidence**: 95%

**Forbidden Imports to Remove**:
- `@/services/api/types`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { BookingDetailsPanel } from './components/BookingDetailsPanel';
```

### OccurrenceStatusBadge

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/RecurringBookingCard.tsx`
- **Target**: `packages/ui/src/components/patterns/status/OccurrenceStatusBadge.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { OccurrenceStatusBadge } from './components/OccurrenceStatusBadge';
```

### OccurrenceList

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/RecurringBookingCard.tsx`
- **Target**: `packages/ui/src/components/patterns/tables/OccurrenceList.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { OccurrenceList } from './components/OccurrenceList';
```

### ConfirmationDialog

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/RecurringBookingCard.tsx`
- **Target**: `packages/ui/src/components/patterns/modals/ConfirmationDialog.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { ConfirmationDialog } from './components/ConfirmationDialog';
```

### WeekdaySelector

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/index.tsx`
- **Target**: `packages/ui/src/components/WeekdaySelector.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { WeekdaySelector } from './components/WeekdaySelector';
```

### TimeRangeSelector

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/index.tsx`
- **Target**: `packages/ui/src/components/TimeRangeSelector.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { TimeRangeSelector } from './components/TimeRangeSelector';
```

### OccurrencePreview

- **Current**: `apps/web/src/components/features/bookings/components/RecurringBookingModal/index.tsx`
- **Target**: `packages/ui/src/components/OccurrencePreview.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/bookings/utils/recurrence`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { OccurrencePreview } from './components/OccurrencePreview';
```

### MapMarkers

- **Current**: `apps/web/src/components/features/listings/components/ListingMap/MapMarkers.tsx`
- **Target**: `packages/ui/src/components/MapMarkers.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/types/listing`

**Required Refactors**:
- Remove 1 forbidden import(s)

**Public Export**:
```typescript
export { MapMarkers } from './components/MapMarkers';
```

### FieldRenderer

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/components/FieldRenderer.tsx`
- **Target**: `packages/ui/src/components/forms/FieldRenderer.tsx`
- **Effort**: L
- **Confidence**: 100%

**Forbidden Imports to Remove**:
- `@/utils/listing/fieldMappingUtils`
- `@/utils/listing/fieldMappingUtils`

**Required Refactors**:
- Remove 2 forbidden import(s)

**Public Export**:
```typescript
export { FieldRenderer } from './components/FieldRenderer';
```

## Platform Package Candidates

### NavigationMenu

- **Current**: `apps/web/src/App.with-registry.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/NavigationMenu.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { NavigationMenu } from './components/NavigationMenu';
```

### ProtectedComponent

- **Current**: `apps/web/src/App.with-registry.tsx`
- **Target**: `packages/ui/src/components/auth/ProtectedComponent.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { ProtectedComponent } from './components/ProtectedComponent';
```

### NavigationItem

- **Current**: `apps/web/src/components/Navigation.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/NavigationItem.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { NavigationItem } from './components/NavigationItem';
```

### TranslationProvider

- **Current**: `apps/web/src/contexts/TranslationContext.tsx`
- **Target**: `packages/ui/src/components/layout/TranslationProvider.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { TranslationProvider } from './components/TranslationProvider';
```

### AppProviders

- **Current**: `apps/web/src/providers/AppProviders.tsx`
- **Target**: `packages/ui/src/components/layout/AppProviders.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { AppProviders } from './components/AppProviders';
```

### Skeleton

- **Current**: `apps/web/src/components/common/LoadingSkeleton.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/Skeleton.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { Skeleton } from './components/Skeleton';
```

### UserSidebar

- **Current**: `apps/web/src/components/dashboard/UserSidebar.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/UserSidebar.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { UserSidebar } from './components/UserSidebar';
```

### CartDropdown

- **Current**: `apps/web/src/components/layouts/PublicLayout/CartDropdown.tsx`
- **Target**: `packages/ui/src/components/layout/CartDropdown.tsx`
- **Effort**: S
- **Confidence**: 95%

**Public Export**:
```typescript
export { CartDropdown } from './components/CartDropdown';
```

### LanguageToggle

- **Current**: `apps/web/src/components/layouts/PublicLayout/LanguageToggle.tsx`
- **Target**: `packages/ui/src/components/layout/LanguageToggle.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { LanguageToggle } from './components/LanguageToggle';
```

### Logo

- **Current**: `apps/web/src/components/layouts/PublicLayout/Logo.tsx`
- **Target**: `packages/ui/src/components/layout/Logo.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { Logo } from './components/Logo';
```

### ViewHeader

- **Current**: `apps/web/src/components/features/search/components/ViewHeader.tsx`
- **Target**: `packages/ui/src/components/layout/ViewHeader.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { ViewHeader } from './components/ViewHeader';
```

### EventContextMenu

- **Current**: `apps/web/src/components/features/calendar/components/EnhancedCalendar/EventContextMenu.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/EventContextMenu.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { EventContextMenu } from './components/EventContextMenu';
```

### WeekNavigation

- **Current**: `apps/web/src/components/features/calendar/components/EnhancedCalendar/WeekNavigation.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/WeekNavigation.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { WeekNavigation } from './components/WeekNavigation';
```

### ListingDetailBreadcrumb

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/ListingDetailBreadcrumb.tsx`
- **Target**: `packages/ui/src/components/layout/ListingDetailBreadcrumb.tsx`
- **Effort**: S
- **Confidence**: 95%

**Public Export**:
```typescript
export { ListingDetailBreadcrumb } from './components/ListingDetailBreadcrumb';
```

### ListingDetailLayout

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/ListingDetailLayout.tsx`
- **Target**: `packages/ui/src/components/layout/ListingDetailLayout.tsx`
- **Effort**: S
- **Confidence**: 95%

**Public Export**:
```typescript
export { ListingDetailLayout } from './components/layout/ListingDetailLayout';
```

### LoadingState

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/ListingDetailStates.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/LoadingState.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { LoadingState } from './components/LoadingState';
```

### ListingHeader

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/ListingHeader.tsx`
- **Target**: `packages/ui/src/components/layout/ListingHeader.tsx`
- **Effort**: S
- **Confidence**: 95%

**Required Refactors**:
- Extract domain hooks: useListingTypeTranslation

**Public Export**:
```typescript
export { ListingHeader } from './components/ListingHeader';
```

### MapLoadingState

- **Current**: `apps/web/src/components/features/listings/components/ListingMap/MapLoadingState.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/MapLoadingState.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { MapLoadingState } from './components/MapLoadingState';
```

### LoadingIndicator

- **Current**: `apps/web/src/components/features/listings/components/checkout/ConfirmTab.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/LoadingIndicator.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { LoadingIndicator } from './components/LoadingIndicator';
```

### StepNavigation

- **Current**: `apps/web/src/components/features/bookings/components/StepByStepBooking/components/StepNavigation.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/StepNavigation.tsx`
- **Effort**: S
- **Confidence**: 100%

**Public Export**:
```typescript
export { StepNavigation } from './components/StepNavigation';
```

### Navigation

- **Current**: `apps/web/src/components/Navigation.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/Navigation.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { Navigation } from './components/Navigation';
```

### AdminSidebar

- **Current**: `apps/web/src/components/dashboard/AdminSidebar.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/AdminSidebar.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useNavPermissions

**Public Export**:
```typescript
export { AdminSidebar } from './components/AdminSidebar';
```

### DashboardHeader

- **Current**: `apps/web/src/components/dashboard/DashboardHeader.tsx`
- **Target**: `packages/ui/src/components/layout/DashboardHeader.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { DashboardHeader } from './components/DashboardHeader';
```

### AdminLayout

- **Current**: `apps/web/src/components/layouts/AdminLayout.tsx`
- **Target**: `packages/ui/src/components/layout/AdminLayout.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/dashboard/DashboardHeader
- Replace app component import: @/components/dashboard/AdminSidebar
- Replace app component import: @/components/search

**Public Export**:
```typescript
export { AdminLayout } from './components/layout/AdminLayout';
```

### ContentHeader

- **Current**: `apps/web/src/components/layouts/ContentHeader.tsx`
- **Target**: `packages/ui/src/components/layout/ContentHeader.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/filters/FilterSection

**Public Export**:
```typescript
export { ContentHeader } from './components/ContentHeader';
```

### UserLayout

- **Current**: `apps/web/src/components/layouts/UserLayout.tsx`
- **Target**: `packages/ui/src/components/layout/UserLayout.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/dashboard/DashboardHeader
- Replace app component import: @/components/dashboard/UserSidebar
- Replace app component import: @/components/search

**Public Export**:
```typescript
export { UserLayout } from './components/layout/UserLayout';
```

### FilterSidebar

- **Current**: `apps/web/src/components/features/filters/FilterSidebar.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/FilterSidebar.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Replace app component import: @/components/filters/FilterSection

**Public Export**:
```typescript
export { FilterSidebar } from './components/filters/FilterSidebar';
```

### MobileMenu

- **Current**: `apps/web/src/components/layouts/PublicLayout/MobileMenu.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/MobileMenu.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { MobileMenu } from './components/MobileMenu';
```

### ProfileMenu

- **Current**: `apps/web/src/components/layouts/PublicLayout/ProfileMenu.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/sidebar/ProfileMenu.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { ProfileMenu } from './components/ProfileMenu';
```

### DefaultLoadingComponent

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/DefaultLoadingComponent.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DefaultLoadingComponent } from './components/DefaultLoadingComponent';
```

### PermissionGuard

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/auth/PermissionGuard.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth, usePermissions

**Public Export**:
```typescript
export { PermissionGuard } from './components/PermissionGuard';
```

### CanCreate

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/layout/CanCreate.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { CanCreate } from './components/CanCreate';
```

### CanUpdate

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/layout/CanUpdate.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { CanUpdate } from './components/CanUpdate';
```

### CanDelete

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/layout/CanDelete.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { CanDelete } from './components/CanDelete';
```

### CanManage

- **Current**: `apps/web/src/components/features/auth/components/PermissionGuard.tsx`
- **Target**: `packages/ui/src/components/layout/CanManage.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { CanManage } from './components/CanManage';
```

### DefaultLoadingComponent

- **Current**: `apps/web/src/components/features/auth/components/ProtectedRoute.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/DefaultLoadingComponent.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DefaultLoadingComponent } from './components/DefaultLoadingComponent';
```

### DefaultUnauthorizedComponent

- **Current**: `apps/web/src/components/features/auth/components/ProtectedRoute.tsx`
- **Target**: `packages/ui/src/components/layout/DefaultUnauthorizedComponent.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DefaultUnauthorizedComponent } from './components/DefaultUnauthorizedComponent';
```

### RequireAuth

- **Current**: `apps/web/src/components/features/auth/components/ProtectedRoute.tsx`
- **Target**: `packages/ui/src/components/layout/RequireAuth.tsx`
- **Effort**: M
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth

**Public Export**:
```typescript
export { RequireAuth } from './components/RequireAuth';
```

### RequireRole

- **Current**: `apps/web/src/components/features/auth/components/ProtectedRoute.tsx`
- **Target**: `packages/ui/src/components/layout/RequireRole.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { RequireRole } from './components/RequireRole';
```

### RequirePermission

- **Current**: `apps/web/src/components/features/auth/components/ProtectedRoute.tsx`
- **Target**: `packages/ui/src/components/layout/RequirePermission.tsx`
- **Effort**: M
- **Confidence**: 95%

**Required Refactors**:
- Generalize props: listingId

**Public Export**:
```typescript
export { RequirePermission } from './components/RequirePermission';
```

### AdminOnly

- **Current**: `apps/web/src/components/features/auth/components/RequireRole.tsx`
- **Target**: `packages/ui/src/components/layout/AdminOnly.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { AdminOnly } from './components/AdminOnly';
```

### StaffOnly

- **Current**: `apps/web/src/components/features/auth/components/RequireRole.tsx`
- **Target**: `packages/ui/src/components/layout/StaffOnly.tsx`
- **Effort**: M
- **Confidence**: 90%

**Public Export**:
```typescript
export { StaffOnly } from './components/StaffOnly';
```

### OwnerOnly

- **Current**: `apps/web/src/components/features/auth/components/RequireRole.tsx`
- **Target**: `packages/ui/src/components/layout/OwnerOnly.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { OwnerOnly } from './components/OwnerOnly';
```

### RequirePermission

- **Current**: `apps/web/src/components/features/auth/components/RequireRole.tsx`
- **Target**: `packages/ui/src/components/layout/RequirePermission.tsx`
- **Effort**: M
- **Confidence**: 95%

**Required Refactors**:
- Generalize props: listingId

**Public Export**:
```typescript
export { RequirePermission } from './components/RequirePermission';
```

### DefaultLoadingComponent

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/dashboard-shell/loading/DefaultLoadingComponent.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { DefaultLoadingComponent } from './components/DefaultLoadingComponent';
```

### RoleGuard

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/auth/RoleGuard.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { RoleGuard } from './components/RoleGuard';
```

### AdminOnly

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/layout/AdminOnly.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { AdminOnly } from './components/AdminOnly';
```

### StaffOnly

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/layout/StaffOnly.tsx`
- **Effort**: M
- **Confidence**: 90%

**Public Export**:
```typescript
export { StaffOnly } from './components/StaffOnly';
```

### OwnerOnly

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/layout/OwnerOnly.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { OwnerOnly } from './components/OwnerOnly';
```

### PlatformAdminOnly

- **Current**: `apps/web/src/components/features/auth/components/RoleGuard.tsx`
- **Target**: `packages/ui/src/components/layout/PlatformAdminOnly.tsx`
- **Effort**: M
- **Confidence**: 100%

**Public Export**:
```typescript
export { PlatformAdminOnly } from './components/PlatformAdminOnly';
```

### GlobalHeader

- **Current**: `apps/web/src/components/layouts/PublicLayout/GlobalHeader.tsx`
- **Target**: `packages/ui/src/components/layout/GlobalHeader.tsx`
- **Effort**: L
- **Confidence**: 80%

**Forbidden Imports to Remove**:
- `@/components/features/listings/components/BookingCartDrawer`

**Required Refactors**:
- Remove 1 forbidden import(s)
- Extract domain hooks: useAuth
- Replace app component import: @/components/layouts/PublicLayout/Logo

**Public Export**:
```typescript
export { GlobalHeader } from './components/GlobalHeader';
```

### RequireRole

- **Current**: `apps/web/src/components/features/auth/components/RequireRole.tsx`
- **Target**: `packages/ui/src/components/layout/RequireRole.tsx`
- **Effort**: L
- **Confidence**: 100%

**Required Refactors**:
- Extract domain hooks: useAuth, useAuthzReady

**Public Export**:
```typescript
export { RequireRole } from './components/RequireRole';
```

### GalleryHeader

- **Current**: `apps/web/src/components/features/listings/components/ListingDetail/GalleryHeader.tsx`
- **Target**: `packages/ui/src/components/layout/GalleryHeader.tsx`
- **Effort**: L
- **Confidence**: 85%

**Forbidden Imports to Remove**:
- `@/components/features/listings/components/ListingImageGallery/GalleryModal`

**Required Refactors**:
- Remove 1 forbidden import(s)
- Extract domain hooks: useListingTypeTranslation

**Public Export**:
```typescript
export { GalleryHeader } from './components/GalleryHeader';
```
