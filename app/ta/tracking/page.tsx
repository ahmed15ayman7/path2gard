"use client";
import {
    Container,
    Box,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";

const data = [
    { name: "Ayman Salim Reda", id: 211050165, track: "AI", percentage: 62 },
    { name: "Ayman Salim Reda", id: 210105205, track: "AI", percentage: 85 },
    { name: "Ayman Salim Reda", id: 205424242, track: "AI", percentage: 47 },
    { name: "Ayman Salim Reda", id: 214240285, track: "AI", percentage: 52 },
    { name: "Ayman Salim Reda", id: 211050165, track: "AI", percentage: 68 },
];

export default function Home() {
    const router = useRouter();
    return (
        <Container sx={{ padding: 0, width: "100%" }}>
            <Box>
                {data.map((row, index) => (
                    <Box
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={() => router.push(`/ta/tracking/${row.id}`)}
                        key={index}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        p={7}
                        borderBottom="1px solid #e0e0e0"
                    >
                        <Box display="flex" alignItems="center">
                            <Avatar
                                alt={row.name}
                                src="/images/user1.jpg"
                                sx={{ marginRight: 2 }}
                            />
                            <Typography variant="body1">{row.name}</Typography>
                        </Box>
                        <Typography variant="body1">{row.id}</Typography>
                        <Chip
                            label={row.track}
                            color="primary"
                            variant="outlined"
                            sx={{ marginLeft: 2 }}
                        />
                        <Typography variant="body1">{row.percentage}%</Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}