import { useEffect, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import GameSuiteClient from "gamesuite_connect";
import { getLeaderboardsDetails, getProjectDetails } from "../lib/SuiConnection";

type Leaderboard = {
  id: string;
  name: string;
  project: string;
  type: "score" | "time" | "points";
  entries: number;
  lastUpdated: string;
};

export function LeaderboardsTable(props: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Leaderboard[]>([]);

    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const gsl = new GameSuiteClient(useCurrentAccount(), signAndExecuteTransaction);

  // const data: Leaderboard[] = [
  //   {
  //     id: "1",
  //     name: "Weekly High Scores",
  //     project: "Racing Challenge",
  //     type: "score",
  //     entries: 156,
  //     lastUpdated: "2 hours ago",
  //   },
  // ];


  useEffect(() => {
    setData([]);
    if(gsl.myAddy){
      console.log("gggg");
      getProjectDetails(props.projectId).then((projectData) => {
        console.log("popopop");
        console.log(projectData.nodes);
        let leaderboardIds: string[] = [];
        projectData.nodes.forEach((projWrapper: any) => {
          leaderboardIds = projWrapper.asMoveObject!.contents.json.leaderboards;
        });
        getLeaderboardsDetails(leaderboardIds).then((leaderboardsData) => {
          console.log("iiiiii");
          console.log(leaderboardsData.nodes);
          leaderboardsData.nodes.forEach((lbData: any) => {
            const lb = lbData.asMoveObject!.contents.json;
            const newOne: Leaderboard = {
              id: "",
              name: lb.id,
              project: "",
              type: "score",
              entries: 0,
              lastUpdated: ""
            };
            setData(prev => [...prev, newOne]);
          });
        });
    });
  }
  }, [gsl.myAddy])


  const columns: ColumnDef<Leaderboard>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Leaderboard Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "project",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("project")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge
            variant={
              type === "score"
                ? "default"
                : type === "time"
                ? "secondary"
                : "outline"
            }
          >
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "entries",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Entries
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("entries")}</div>
      ),
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => <div>{row.getValue("lastUpdated")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const leaderboard = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(leaderboard.id)}
              >
                Copy leaderboard ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View leaderboard</DropdownMenuItem>
              <DropdownMenuItem>Edit leaderboard</DropdownMenuItem>
              <DropdownMenuItem>Reset leaderboard</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete leaderboard</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter leaderboards..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm bg-white"
          />
        </div>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No leaderboards found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-white"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
