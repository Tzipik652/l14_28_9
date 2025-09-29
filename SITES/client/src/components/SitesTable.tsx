import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { addSite, deleteSite, getSites, updateSite } from "../services/service";
import EditSiteForm from "./EditSiteForm";

interface Site {
  _id: string;
  name: string;
  url: string;
  image: string;
  score: number;
}

export default function SitesTable() {
  const [sites, setSites] = useState<Site[]>([]);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("_id");
  const [reverse, setReverse] = useState("no");
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / perPage);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  useEffect(() => {
    loadSites();
  }, [page, perPage, sort, reverse]);

  const loadSites = async () => {
    const result = await getSites(page, perPage, sort, reverse);
    setSites(result.data);
    setCount(result.count);
  };

  const handleDelete = async (id: string) => {
    await deleteSite(id);
    loadSites();
  };

  const handleUpdate = async (values: any) => {
    if (!editingSite) return;
    await updateSite(editingSite._id, values);
    setEditingSite(null);
    loadSites();
  };

  const handleAdd = async (values: any) => {
    await addSite(values);
    setIsAdding(false);
    loadSites();
  };

  return (
    <>
      <div style={{ maxWidth: 800, margin: "20px auto", textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAdding(true)}
        >
          Add Site
        </Button>
      </div>

      <TableContainer
        component={Paper}
        style={{ maxWidth: 800, margin: "auto", marginTop: 20 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site._id}>
                <TableCell>
                  <img
                    src={site.image}
                    alt={site.name}
                    width={24}
                    height={24}
                  />
                </TableCell>
                <TableCell>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    {site.name}
                  </a>
                </TableCell>
                <TableCell>{site.score}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEditingSite(site)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(site._id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!hasPrev}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Prev
      </Button>

      <span>
        Page {page} of {totalPages}
      </span>

      <Button disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>
        Next
      </Button>

      <Button onClick={() => setReverse(reverse === "yes" ? "no" : "yes")}>
        Toggle Sort
      </Button>

      <Dialog open={!!editingSite} onClose={() => setEditingSite(null)}>
        <DialogTitle>Edit Site</DialogTitle>
        <DialogContent>
          {editingSite && (
            <EditSiteForm
              initialValues={{
                name: editingSite.name,
                url: editingSite.url,
                image: editingSite.image,
                score: editingSite.score,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAdding} onClose={() => setIsAdding(false)}>
        <DialogTitle>Add New Site</DialogTitle>
        <DialogContent>
          <EditSiteForm
            initialValues={{
              name: "",
              url: "",
              image: "",
              score: 0,
            }}
            onSubmit={handleAdd}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
