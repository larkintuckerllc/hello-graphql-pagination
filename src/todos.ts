import { UserInputError } from 'apollo-server-express';

interface Todo {
  completed: boolean;
  id: string;
  title: string;
}
interface TodosResult {
  totalCount: number;
  todos: Todo[];
}
interface Edge {
  cursor: string;
  node: Todo;
}
interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}
interface TodosResultCursor {
  edges: Edge[];
  pageInfo: PageInfo;
  totalCount: number;
}
const data = [
  {
    completed: false,
    id: 'cjl0t6qt2000p3j10f6dd7jnk',
    title: 'index overriding Games',
  },
  {
    completed: false,
    id: 'cjl0t6qt2000q3j10zsnc4a54',
    title: 'Savings Account microchip',
  },
  {
    completed: false,
    id: 'cjl0t6qt2000r3j10vp3hfr2b',
    title: 'protocol',
  },
  {
    completed: false,
    id: 'cjl0t6qt2000s3j10wzr7x9e4',
    title: 'Togo Dynamic Berkshire',
  },
  {
    completed: false,
    id: 'cjl0t6qt2000t3j10c1bkph3j',
    title: 'Checking Account deposit Computer',
  },
  {
    completed: false,
    id: 'cjl0t6qt2000u3j101tfirabu',
    title: 'Buckinghamshire generate',
  },
  {
    completed: false,
    id: 'cjl0t6qt3000v3j10tkprvt9v',
    title: 'Representative copying',
  },
  {
    completed: false,
    id: 'cjl0t6qt3000w3j10qzcmlvd9',
    title: 'payment',
  },
  {
    completed: false,
    id: 'cjl0t6qt3000x3j10c3azsvsx',
    title: 'relationships',
  },
  {
    completed: false,
    id: 'cjl0t6qt3000y3j10eiqao47j',
    title: 'Legacy Lodge Facilitator',
  },
  {
    completed: false,
    id: 'cjl0t6qt3000z3j10345thv60',
    title: 'calculating GB',
  },
  {
    completed: false,
    id: 'cjl0t6qt300103j10jckefl0k',
    title: 'Baby application Music',
  },
  {
    completed: false,
    id: 'cjl0t6qt300113j107qhpey4r',
    title: 'multi-tasking',
  },
  {
    completed: false,
    id: 'cjl0t6qt300123j10j97xxrqv',
    title: 'Mauritius Rupee navigate',
  },
  {
    completed: false,
    id: 'cjl0t6qt300133j10rlvsm95s',
    title: 'National',
  },
  {
    completed: false,
    id: 'cjl0t6qt300143j10tpeyhhe1',
    title: 'primary Usability web-enabled',
  },
  {
    completed: false,
    id: 'cjl0t6qt400153j106wc9zp84',
    title: 'Ergonomic Granite Soap Rustic Algerian Dinar',
  },
  {
    completed: false,
    id: 'cjl0t6qt400163j10wozlm3qc',
    title: 'zero tolerance',
  },
  {
    completed: false,
    id: 'cjl0t6qt400173j10asv6qjry',
    title: 'Sausages',
  },
  {
    completed: false,
    id: 'cjl0t6qt400183j10xtzat8nv',
    title: 'Cedi Accounts',
  },
  {
    completed: false,
    id: 'cjl0t6qt400193j10wr2mge2p',
    title: 'Money Market Account',
  },
  {
    completed: false,
    id: 'cjl0t6qt4001a3j10h8ydnpua',
    title: 'Mobility Iran',
  },
  {
    completed: false,
    id: 'cjl0t6qt4001b3j10kc6lmvzz',
    title: 'transmitting Principal',
  },
  {
    completed: false,
    id: 'cjl0t6qt4001c3j10yjhx4l3u',
    title: 'whiteboard',
  },
  {
    completed: false,
    id: 'cjl0t6qt4001d3j10pho0yqxy',
    title: 'target enhance asymmetric',
  },
];
export const allTodos = (_: any, { first, offset = 0 }: { first: number, offset: number}): TodosResult => {
  const totalCount = data.length;
  const todos = first === undefined ?
    data.slice(offset) :
    data.slice(offset, offset + first);
  const result = {
    todos,
    totalCount,
  };
  return result;
};
export const allTodosCursor = (_: any, { after, first }: {after: string, first: number }): TodosResultCursor => {
  if (first < 0) {
    throw new UserInputError('First must be positive');
  }
  const totalCount = data.length;
  let todos = [] as Todo[];
  let start = 0;
  if (after !== undefined) {
    const buff = new Buffer(after, 'base64');
    const id = buff.toString('ascii');
    const index = data.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new UserInputError('After does not exist');
    }
    start = index + 1;
  }
  todos = first === undefined ?
    data :
    data.slice(start, start + first);
  let endCursor: string;
  const edges = todos.map((todo) => {
    const buffer = new Buffer(todo.id);
    endCursor = buffer.toString('base64');
    return ({
      cursor: endCursor,
      node: todo,
    });
  });
  const hasNextPage = start + first < totalCount;
  const pageInfo = endCursor !== undefined ?
    {
      endCursor,
      hasNextPage,
    } :
    {
      hasNextPage,
    };
  const result = {
    edges,
    pageInfo,
    totalCount,
  };
  return result;
};
