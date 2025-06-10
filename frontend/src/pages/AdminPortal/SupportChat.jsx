import React, { useState, useEffect } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import { useSocket } from "../../hooks/useSocket";
import {
  useConversations,
  useConversation,
  useAddMessage,
  useCloseConversation,
  useConversationStats,
} from "../../api/conversationAPI";
import {
  Ticket,
  MessageSquare,
  CheckCircle2,
  Clock,
  Paperclip,
  Send,
  Mail,
  Phone,
} from "lucide-react";
import SearchInput from "../../components/SearchInput";
import FilterTabs from "../../components/Filters";
import useAuth from "../../hooks/useAuth";
import useDataManager from "../../hooks/useDataManager";

const SupportChat = () => {
  const { isMobile, sidebarExpanded } = useSidebar();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All Conversations");
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [message, setMessage] = useState("");

  // Socket.IO hooks
  const {
    joinConversation,
    leaveConversation,
    onNewMessage,
    onConversationClosed,
  } = useSocket();

  // React Query hooks
  const { data: conversations = [], isLoading: conversationsLoading } =
    useConversations();
  const { data: selectedConversation, isLoading: conversationLoading } =
    useConversation(selectedConversationId);
  const { data: stats = {} } = useConversationStats();
  const addMessageMutation = useAddMessage();
  const closeConversationMutation = useCloseConversation();

  // Use DataManager for search and filtering
  const {
    filteredData: filteredConversations,
    searchTerm,
    setSearchTerm,
  } = useDataManager(conversations, {
    searchKey: "subject",
    rowsPerPageDefault: 10,
  });

  // Apply additional filter for requesterModel
  const finalFilteredConversations = filteredConversations.filter((conv) => {
    return (
      activeFilter === "All Conversations" ||
      conv.requesterModel === activeFilter
    );
  });

  // Socket event handlers
  useEffect(() => {
    if (selectedConversationId) {
      joinConversation(selectedConversationId);
    }

    const handleNewMessage = ({ conversationId, message }) => {
      if (conversationId === selectedConversationId) {
        console.log("New message received:", message);
      }
    };

    const handleConversationClosed = ({ conversationId }) => {
      if (conversationId === selectedConversationId) {
        // Update conversation status in real-time
      }
    };

    onNewMessage(handleNewMessage);
    onConversationClosed(handleConversationClosed);

    return () => {
      if (selectedConversationId) {
        leaveConversation(selectedConversationId);
      }
    };
  }, [
    selectedConversationId,
    joinConversation,
    leaveConversation,
    onNewMessage,
    onConversationClosed,
  ]);

  // Handle message send
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversationId) return;

    try {
      await addMessageMutation.mutateAsync({
        conversationId: selectedConversationId,
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle conversation close
  const handleCloseConversation = async () => {
    if (!selectedConversationId) return;

    try {
      await closeConversationMutation.mutateAsync(selectedConversationId);
    } catch (error) {
      console.error("Error closing conversation:", error);
    }
  };

  if (conversationsLoading || conversationLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col w-full mt-[60px] min-h-screen bg-gray-50 p-4 md:p-6"
      style={{
        marginLeft: isMobile ? "0" : sidebarExpanded ? "220px" : "80px",
        width: isMobile
          ? "100%"
          : `calc(100% - ${sidebarExpanded ? "220px" : "80px"})`,
      }}
    >
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-xl font-medium">Support Tickets & Chats</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#d9d9d9]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium text-black">
                  TOTAL TICKETS
                </div>
                <div className="text-2xl font-bold text-black">
                  {stats.totalTickets}
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#d7f8e3] rounded-3xl">
                <Ticket className="w-6 h-6 text-[#00922f]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#d9d9d9]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium text-black">
                  TOTAL OPEN CHATS
                </div>
                <div className="text-2xl font-bold text-black">
                  {stats.openChats}
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#d7f8e3] rounded-3xl">
                <MessageSquare className="w-6 h-6 text-[#00922f]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#d9d9d9]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium text-black">
                  RESOLVED TODAY
                </div>
                <div className="text-2xl font-bold text-black">
                  {stats.resolvedToday}
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#d7f8e3] rounded-3xl">
                <CheckCircle2 className="w-6 h-6 text-[#00922f]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-[#d9d9d9]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-medium text-black">
                  AVERAGE RESPONSE TIME
                </div>
                <div className="text-2xl font-bold text-black">
                  {stats.avgResponseTime}
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-[#d7f8e3] rounded-3xl">
                <Clock className="w-6 h-6 text-[#00922f]" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <SearchInput
            placeholder="Search Conversations"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <FilterTabs
            filters={[
              "All Conversations",
              "Users",
              "Pujari",
              "Bhajantri",
              "Store",
            ]}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[511px]">
          {/* Conversations List */}
          <div className="lg:col-span-3 flex flex-col overflow-y-auto bg-white rounded-lg border border-[#f4f4f4]">
            <div className="p-4 border-b border-[#f4f4f4]">
              <h2 className="text-base font-medium">Conversations</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {finalFilteredConversations.map((conv) => (
                  <div
                    key={conv._id}
                    className={`p-4 cursor-pointer ${
                      selectedConversationId === conv._id
                        ? "bg-[#00922f1a]"
                        : "border-b border-[#d9d9d9]"
                    }`}
                    onClick={() => setSelectedConversationId(conv._id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col gap-1">
                        <div className="text-base font-medium text-[#272829]">
                          {conv.requester.fullName}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium text-[#272829]">
                            {conv.requesterModel}
                          </span>
                          <span className="w-1 h-1 bg-[#d9d9d9] rounded-full"></span>
                          <span className="text-xs font-medium text-[#272829]">
                            {conv.category}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-[32px] ${
                          conv.status === "Open"
                            ? "bg-[#ff000033] border border-[#ff0000]"
                            : conv.status === "In Progress"
                            ? "bg-[#ffff0033] border border-[#a7a700]"
                            : "bg-[#00922f33] border border-[#00922f]"
                        }`}
                      >
                        <span
                          className={`text-xs font-medium ${
                            conv.status === "Open"
                              ? "text-[#ff0000]"
                              : conv.status === "In Progress"
                              ? "text-[#a7a700]"
                              : "text-[#00922f]"
                          }`}
                        >
                          {conv.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#272829] mb-2">
                      {conv.subject}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-[#272829]">
                        {conv.ticketId}
                      </span>
                      <span className="text-xs font-medium text-[#272829]">
                        {new Date(conv.lastMessage).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation && (
            <div className="lg:col-span-6 flex flex-col bg-gray-50 rounded-lg border border-[#eeeeee]">
              <div className="p-4 bg-white border-b border-[#eeeeee]">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="text-base font-bold text-black">
                      {selectedConversation.requester.fullName}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#272829]">
                        {selectedConversation.requesterModel}
                      </span>
                      <span className="w-1 h-1 bg-[#d9d9d9] rounded-full"></span>
                      <span className="text-xs font-medium text-[#272829]">
                        {selectedConversation.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#272829]">
                    {selectedConversation.ticketId}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                  {selectedConversation.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        msg.senderModel === user.role
                          ? "items-end"
                          : "items-start"
                      } gap-2.5`}
                    >
                      <div
                        className={`w-[230px] p-3 ${
                          msg.senderModel === user.role
                            ? "bg-[#00922f1a]"
                            : "bg-white"
                        } rounded-lg border border-[#eeeeee]`}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-medium text-[#00922f]">
                            {msg.senderModel === user.role
                              ? "You"
                              : msg.sender.fullName}
                          </span>
                          <span className="text-xs font-medium text-black">
                            {new Date(msg.timestamp).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-black">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedConversation.status !== "Closed" &&
                user.role !== "Admin" && (
                  <div className="p-4 bg-white border-t border-[#eeeeee]">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#eeeeee]">
                        <Paperclip className="w-4 h-4 text-black" />
                      </button>
                      <input
                        type="text"
                        placeholder="Enter your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="flex-1 px-4 py-3 rounded-[32px] border border-[#eeeeee] text-sm font-medium text-[#aaaaaa] outline-none"
                      />
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-[#00922f] rounded-full"
                        onClick={handleSendMessage}
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* User Info */}
          {selectedConversation && (
            <div className="lg:col-span-3 flex flex-col bg-white rounded-lg border border-[#f4f4f4]">
              <div className="p-4">
                <h2 className="text-base font-bold text-black mb-4">
                  {selectedConversation.requester.fullName}
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base font-medium text-[#272829] mb-3">
                      Contact Information
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4 text-[#272829]" />
                        <span className="text-xs font-medium text-[#272829]">
                          {selectedConversation.requester.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-[#272829]" />
                        <span className="text-xs font-medium text-[#272829]">
                          {selectedConversation.requester.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#f4f4f4] pt-4">
                    <h3 className="text-base font-medium text-[#272829] mb-3">
                      Ticket Information
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-[#272829]">
                          Status
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            selectedConversation.status === "Open"
                              ? "text-[#ff0000]"
                              : selectedConversation.status === "In Progress"
                              ? "text-[#a7a700]"
                              : "text-[#00922f]"
                          }`}
                        >
                          {selectedConversation.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-[#272829]">
                          Priority
                        </span>
                        <span className="text-xs font-medium text-[#272829]">
                          {selectedConversation.priority}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-[#272829]">
                          Category
                        </span>
                        <span className="text-xs font-medium text-[#272829]">
                          {selectedConversation.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedConversation.status !== "Closed" &&
                user.role === "Staff" && (
                  <div className="mt-auto p-4">
                    <button
                      className="w-full flex items-center justify-center gap-2 p-2 bg-[#00922f] text-white rounded"
                      onClick={handleCloseConversation}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-base font-medium">
                        Mark as Resolved
                      </span>
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
