

export default function PatientDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
        <body className='min-h-[720px] h-auto bg-gray-200 '>{children}</body>
    </html>
      
  );
}
