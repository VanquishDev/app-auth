import awsconfig from "@/aws-exports";

export const config = {
    //...JSON.parse(process.env.NEXT_PUBLIC_AWS_EXPORTS_CONFIG!),
    ... awsconfig, 
    ssr: true, // important to set authorization cookies on client
  };