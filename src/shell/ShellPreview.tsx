import { AppShell } from './components/AppShell'

/**
 * Shell Preview for Design OS
 * This component demonstrates the Listing Detail shell layout
 */
export default function ShellPreview() {
  return (
    <AppShell
      listingName="Møterom 101"
      listingType="Rom"
      address="Storgata 1, 0155 Oslo"
      activeTab="oversikt"
      breadcrumbs={[
        { label: 'Hjem', href: '/' },
        { label: 'Fasiliteter', href: '/fasiliteter' },
        { label: 'Møterom 101' },
      ]}
    />
  )
}
