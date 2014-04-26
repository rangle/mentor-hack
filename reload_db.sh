

for COLLECTION in users teams
do
  echo
  echo "# <$COLLECTION>"
  node_modules/koast/bin/koast drop --col=$COLLECTION
  node_modules/koast/bin/koast load --col=$COLLECTION --src=data/$COLLECTION.json
done

