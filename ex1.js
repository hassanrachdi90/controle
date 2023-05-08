from hedera import Hbar, AccountId, PrivateKey, ConsensusTopicCreateTransaction, ConsensusTopicUpdateTransaction, ConsensusMessageSubmitTransaction, ConsensusTopicInfoQuery

#Replace_these_values_with_your_own
OPERATOR_ID = AccountId.fromString("0.0.4598800")
OPERATOR_KEY = PrivateKey.fromString("302e020100300506032b65700422042044453749a45819233d2dc9ea8e714518b2f5b63bcf78d0210b97ee548ca0ae1f")

#Create_admin_and_submit_keys
admin_key = PrivateKey.generate()
submit_key = PrivateKey.generate()

#Create_Consensus_Topic
memo = "Hey Hedera!"
topic_result = ConsensusTopicCreateTransaction().setAdminKey(admin_key.publicKey).setSubmitKey(submit_key.publicKey).setTopicMemo(memo).execute(client)

#Get_Topic ID
topic_id = topic_result.getReceipt(client).topicId

#Query_Topic_Info
info = ConsensusTopicInfoQuery().setTopicId(topic_id).execute(client)

#Print_Topic_Info
print("Topic ID:", topic_id.toString())
print("Memo:", info.topicMemo)

#Update_Topic_Memo
new_memo = "Updated me"
update_result = ConsensusTopicUpdateTransaction().setTopicId(topic_id).setTopicMemo(new_memo).freezeWith(client).sign(admin_key).execute(client)

#Query_Topic_Info_Again
info = ConsensusTopicInfoQuery().setTopicId(topic_id).execute(client)

#Print_Updated_Topic_Info
print("Updated Memo:", info.topicMemo)

#Submit_Message_to_Topic
message = b"Hey I from Hedera!"
submit_result = ConsensusMessageSubmitTransaction().setTopicId(topic_id).setMessage(message).execute(client)

#Print_Message
print("Message:", message.decode())