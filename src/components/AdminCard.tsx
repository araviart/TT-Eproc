import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTable from "@/components/AdminTable";

const AdminCard = () => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Produits</CardTitle>
        <CardDescription>
          Gérez vos produits et catégories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AdminTable />
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {/* faire pagination */}
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;