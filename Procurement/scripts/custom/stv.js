function runSTV(numSeats, candidates, ballots) {
    // console.log('%cInside stv', 'color:gray; font-size:32px')
    const numCandidates = candidates.length;
    const quotas = Math.floor(ballots.length / (1 + 1) + 1);

    const elected = [];
    const eliminated = [];
    let round = 1;
    //console.log(ballots)
    while (elected.length < numSeats) {
        console.log('Counting Round ' + round);
        console.log(candidates, 'Current Round Candidates');
        const votes = {};

        for (let i = 0; i < candidates.length; i++) {
            votes[candidates[i]] = 0;
        }

        //counting the votes
        for (let i = 0; i < ballots.length; i++) {
            const preferences = ballots[i];
            //if candidate is eliminated then count voters next preference in this for loop
            for (let j = 0; j < preferences.length; j++) {
                const candidate = preferences[j];
                if (votes.hasOwnProperty(candidate)) {
                    votes[candidate]++;
                    break;
                }
            }
        }
        console.log(votes, 'Votes of Each Candidate');

        //finding winner, if any candidate meet the quota
        for (let i = 0; i < candidates.length; i++) {
            // console.log(votes[candidates[i]])
            if (votes[candidates[i]] >= quotas) {
                return candidates[i];
            }
        }

        // getting the least number of votes
        const minVotes = Math.min(...Object.values(votes));

        if (minVotes === Infinity) {
            break;
        }

        const eliminatedCandidates = [];
        // making an array of candidates having minVotes
        for (let i = 0; i < numCandidates; i++) {
            const candidate = candidates[i];

            if (!eliminated.includes(candidate)) {
                if (votes[candidate] === minVotes) {
                    eliminatedCandidates.push(candidate);
                }
            }
        }
        // case: all candidates have equal votes
        // thus eliminate the last candidate in the array of eliminatedCandidates
        if (eliminatedCandidates.length == candidates.length) {
            // console.log('all candidates have same minVotes', eliminatedCandidates);
            eliminatedCandidates.reverse();
            while (eliminatedCandidates.length > 1) {
                // console.log('hi');
                eliminatedCandidates.pop();
            }
        }

        //never occuring condition
        if (eliminatedCandidates.length === 0) {
            break;
        }
        // remove the candidate from the candidates array passed to function
        for (let i = 0; i < eliminatedCandidates.length; i++) {
            eliminated.push(eliminatedCandidates[i]);
            const index = candidates.indexOf(eliminatedCandidates[i]);
            candidates.splice(index, 1);
        }

        round++;
        // console.log(eliminated, 'eliminated until now');
    }
    /* console.log(
        elected,
        '------------------------elected---------------------------'
    ); */
    return elected;
}

/* const winners = runSTV(
    1,
    ['0', '1', '2'],
    [
        ['0', '2', '1'],
        ['2', '0', '1'],
        ['1', '0', '2'],
        ['1', '0', '2'],
        ['2', '1', '0'],
        ['0', '2', '1'],
    ]
);
console.log(winners, 'winner'); */

  // ["2","0","1"], ["0","2","1"], ["1","0","2"],["1","0","2"],["1","0","2"],["0","2","1"]
