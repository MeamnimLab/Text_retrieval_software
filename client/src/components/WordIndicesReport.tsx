import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { apiService } from '../apiService';

interface WordIndex {
  Line: number;
  WordIndex: number;
}

interface WordIndicesMap {
  [word: string]: WordIndex[];
}

// Styled components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  padding: '2rem',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '800px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledTable = styled(Table)({
  marginTop: '1rem',
});

const StyledTableCell = styled(TableCell)({
  color: '#FF69B4',
});

const StyledTableHeadCell = styled(TableCell)({
  color: '#00CED1',
  fontWeight: 'bold',
});

const WordIndicesReport: React.FC = () => {
  const { getData } = apiService();
  const [wordIndices, setWordIndices] = useState<WordIndicesMap>({});
  const [searchLine, setSearchLine] = useState('');
  const [searchWordIndex, setSearchWordIndex] = useState('');
  const [filteredWords, setFilteredWords] = useState<WordIndicesMap>({});

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const response = await getData('api/words/wordIndices');
        setWordIndices(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error('Error fetching word indices:', error);
      }
    };
    fetchIndex();
  }, []);

  const handleSearch = () => {
    const line = parseInt(searchLine, 10);
    const wordIndex = parseInt(searchWordIndex, 10);
    const filtered: WordIndicesMap = {};

    Object.entries(wordIndices).forEach(([word, indices]) => {
      indices.forEach(index => {
        if (index.Line === line && index.WordIndex === wordIndex) {
          if (!filtered[word]) {
            filtered[word] = [];
          }
          filtered[word].push(index);
        }
      });
    });

    setFilteredWords(filtered);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#FF69B4' }}>
        Word Indices Report
      </Typography>
      <StyledBox>
        <TextField
          label="Search Line"
          variant="outlined"
          value={searchLine}
          onChange={(e) => setSearchLine(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <TextField
          label="Search Word Index"
          variant="outlined"
          value={searchWordIndex}
          onChange={(e) => setSearchWordIndex(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: '1rem', backgroundColor: '#00CED1', color: '#fff' }}
        >
          Search
        </Button>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Word</StyledTableHeadCell>
              <StyledTableHeadCell>Indices (Line, Word Index)</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(filteredWords).length > 0
              ? Object.entries(filteredWords).map(([word, indices]) => (
                  <TableRow key={word}>
                    <StyledTableCell>{word}</StyledTableCell>
                    <StyledTableCell>
                      {indices.map((index, idx) => (
                        <span key={idx}>
                          ({index.Line}, {index.WordIndex})
                          {idx < indices.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </StyledTableCell>
                  </TableRow>
                ))
              : Object.entries(wordIndices).map(([word, indices]) => (
                  <TableRow key={word}>
                    <StyledTableCell>{word}</StyledTableCell>
                    <StyledTableCell>
                      {indices.map((index, idx) => (
                        <span key={idx}>
                          ({index.Line}, {index.WordIndex})
                          {idx < indices.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </StyledTableCell>
                  </TableRow>
                ))}
          </TableBody>
        </StyledTable>
      </StyledBox>
    </StyledContainer>
  );
};

export default WordIndicesReport;
