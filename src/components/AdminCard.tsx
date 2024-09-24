import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminTable from "./AdminTable";
import { AdminCardProps } from "@/types/AdminCardProps";
import TablePlaceholder from "./TablePlaceHolder";
import { Skeleton } from "./ui/skeleton";

const AdminCard: React.FC<AdminCardProps> = ({
  selectedTab,
  items,
  loading,
  error,
  addItem,
  editItem,
  removeItem,
}) => {
  const columns = items.length > 0 ? Object.keys(items[0]) : [];
  console.log(columns);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <TablePlaceholder />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <AdminTable
            items={items}
            columns={columns}
            selectedTab={selectedTab}
            onAddClick={addItem}
            onEditClick={(data) => editItem(data.id?.toString() || "", data)}
            editItem={(id) => editItem(id, {})}
            removeItem={removeItem}
          />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs">
          {loading ? (
            <Skeleton className="w-16 h-3" />
          ) : (
            <>
              Affiche <strong>{items.length}</strong> {selectedTab}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;
