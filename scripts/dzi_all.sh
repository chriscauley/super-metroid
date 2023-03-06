for logic in mirror vanilla
do
    for layout in nordub legacy streaming alt-streaming
    do
        python scripts/dzi.py client/layouts/$logic/$layout
    done
done