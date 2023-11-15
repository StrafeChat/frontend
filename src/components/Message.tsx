import Image from "next/image";
import Markdown, { Components } from "react-markdown";
import ReactTimeago from "react-timeago";
import remarkGfm from "remark-gfm";

const components: Partial<Components> = {
  // p: ({ node }) => {
  //   console.log(node)
  //   return (
  //     <>
  //       {node?.children.map((child, index) => (
  //         <div className="text-md" key={index}>
  //           {child.tagName != "code" ? (
  //             child
  //           ) : (
  //             <div className="bg-neutral-700 w-fit p-1 my-1 rounded-md">
  //               {child.children.map((child: any) => child.value)}
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </>
  //   );
  // },
  h1: ({ node }) => {
    return (
      <>
        {node?.children.map((child, index) => (
          <h1 className="text-3xl font-bold" key={index}>
            {(child as any).value}
          </h1>
        ))}
      </>
    );
  },
  pre: ({ node }) => {
    return (
      <>
        {node?.children.map((child, index) => (
          <div key={index} className="pr-4">
            {(child as any).children?.map((child: any, key: number) => (
              <code
                className="text-md p-1 w-full bg-black rounded-md block"
                key={key}
              >
                {(child as any).value}
              </code>
            ))}
          </div>
          //   <code className="text-md p-1 w-full bg-black rounded-md" key={index}>
          //     {(child as any).value}
          //   </code>
        ))}
      </>
    );
  },
  blockquote: ({ node }) => {
    return (
      <blockquote>
        {node?.children.map((child: any, key) => (
          <div key={key}>
            {child.children?.map((child: any, key: number) => (
              <div key={key} className="flex gap-1 h-fit">
                <div className="w-1 h-[2rem] rounded-full bg-[rgba(255,255,255,0.1)]"></div>
                <span>{child.value}</span>
              </div>
            ))}
          </div>
        ))}
      </blockquote>
    );
  },
  table: ({ node }) => {
    return (
      <table className="bg-stone-900 border">
        {node?.children.map((child) => {
          switch (child.type) {
            case "element":
              switch (child.tagName) {
                case "thead":
                  return (
                    <thead>
                      {child.children.map((child) => {
                        switch (child.type) {
                          case "element":
                            switch (child.tagName) {
                              case "tr":
                                return (
                                  <tr>
                                    {child.children.map((child) => {
                                      switch (child.type) {
                                        case "element":
                                          switch (child.tagName) {
                                            case "th":
                                              return (
                                                <>
                                                  {child.children.map(
                                                    (child) => {
                                                      switch (child.type) {
                                                        case "text":
                                                          return (
                                                            <th className="border p-2">
                                                              {child.value}
                                                            </th>
                                                          );
                                                      }
                                                    }
                                                  )}
                                                </>
                                              );
                                          }
                                      }
                                    })}
                                  </tr>
                                );
                            }
                        }
                      })}
                    </thead>
                  );
                case "tbody":
                  return (
                    <tbody>
                      {child.children.map((child) => {
                        switch (child.type) {
                          case "element":
                            switch (child.tagName) {
                              case "tr":
                                return (
                                  <tr>
                                    {child.children.map((child) => {
                                      switch (child.type) {
                                        case "element":
                                          switch (child.tagName) {
                                            case "td":
                                              return (
                                                <>
                                                  {child.children.map(
                                                    (child) => {
                                                      switch (child.type) {
                                                        case "text":
                                                          return (
                                                            <td className="border p-2">
                                                              {child.value}
                                                            </td>
                                                          );
                                                      }
                                                    }
                                                  )}
                                                </>
                                              );
                                          }
                                      }
                                    })}
                                  </tr>
                                );
                            }
                        }
                      })}
                    </tbody>
                  );
              }
              break;
          }
        })}
      </table>
    );
  },
  a: ({ node }) => {
    return (
      <>
        {node?.children.map((child) => {
          switch (child.type) {
            case "text":
              return (
                <a id="message-link" className="text-red-500 hover:text-red-400 underline" href={child.value}>
                  {child.value}
                </a>
              );
          }
        })}
      </>
    );
  },
};

const plugins = [remarkGfm];

export default function Message({
  messages,
  message,
  attachments,
  index,
}: {
  messages: any[];
  message: any;
  attachments: any[] | null;
  index: number;
}) {
  if (index > 0) {
    if (messages[index - 1].author.id == message.author.id)
      return (
        <li key={index} className="flex gap-2.5 message break-normal">
          <div className="w-10 flex-shrink-0"></div>
          <div style={{ whiteSpace: "pre-line" }} className="w-full">
            <Markdown remarkPlugins={plugins} components={components}>
              {message.content}
            </Markdown>
          </div>
          {/* {attachments?.map((attachment) => (
            <Image key={attachment.url} src={attachment} alt='e' /> 
          ))} */}
        </li>
      );
    else
      return (
        <li key={index} className="flex gap-2.5 pt-3.5 message">
          <div className="w-10 h-10 flex-shrink-0">
            <Image
              src={message.author.avatar}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full select-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex gap-1 mt-[-4.5px]">
              <span>
                <b>{message.author.displayName || message.author.username}</b>
                &nbsp;
                <ReactTimeago
                  className="text-gray-400 text-xs"
                  date={new Date(message.createdAt).getTime() - 500}
                />
              </span>
            </div>
            <div style={{ whiteSpace: "pre-line" }} className="w-full">
              <Markdown remarkPlugins={plugins} components={components}>
                {message.content}
              </Markdown>
            </div>
          </div>
        </li>
      );
  } else {
    return (
      <li key={index} className="flex gap-2.5 pt-3.5 message">
        <div className="w-10 h-10 flex-shrink-0">
          <Image
            src={message.author.avatar}
            width={50}
            height={50}
            alt="profile"
            className="rounded-full select-none"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-1 mt-[-8px] w-full">
            <span>
              <b>{message.author.displayName || message.author.username}</b>
              &nbsp;
              <ReactTimeago
                className="text-gray-400 text-xs"
                date={new Date(message.createdAt).getTime() - 500}
              />
            </span>
          </div>
          <div style={{ whiteSpace: "pre-line" }} className="w-full">
            <Markdown remarkPlugins={plugins} components={components}>
              {message.content}
            </Markdown>
          </div>
        </div>
      </li>
    );
  }
}
