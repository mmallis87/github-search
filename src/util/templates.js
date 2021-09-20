export const lastThreeCommits = (formattedCommitUsers) =>
  `Last 3 commits by ${formattedCommitUsers}.`;
export const lastFork = ({ login }) => `The last fork was created by ${login}.`;
export const hisBio = (bio) => `this in his biography: "${bio}"`;
export const ownerBio = (formattedBio) => `The owner has ${formattedBio}.`;
